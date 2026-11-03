# Azure Pronunciation Assessment — LDD English

## Scope

Only **Từ vựng → Dịch câu → đọc cả câu** uses Azure when configured.

- Existing sentence recording/auto-stop stays intact.
- \`ldd-azure-sentence.js\` intercepts only the existing Cloudflare endpoint when \`mode: "sentence"\`.
- It detects whether the Azure Edge Function is enabled; disabled/unavailable/budget-exhausted requests go to the existing Cloudflare Whisper route.
- Word pronunciation buttons and normal Speaking submissions remain unchanged.

## Provisioning (must be done within the owner's Azure subscription)

1. In https://portal.azure.com create an **Azure AI Speech** resource, selecting **Free F0** pricing tier. Do not create Standard S0. Verify the resource overview shows F0.
2. Under **Keys and Endpoint**, note the **region** and copy **Key 1** (or Key 2). **Never put the key into GitHub, chat, client JavaScript, or the browser.**
3. In Supabase **Edge Functions → Secrets** for project \`ywqbaksmmtvwbojcgsdd\`, add:
   - \`AZURE_SPEECH_KEY\` = Azure Speech resource key (secret)
   - \`AZURE_SPEECH_REGION\` = Azure Speech region identifier (e.g. \`southeastasia\`)
   - \`AZURE_SPEECH_TIER\` = \`F0\`
   - \`AZURE_SPEECH_ENABLED\` = \`1\`
4. The \`azure-pronounce-sentence\` function was deployed without secrets; it remains disabled until all settings are available.
5. After credentials are configured, merge this branch's frontend changes (and verify the deployed website loads \`ldd-azure-sentence.js\`).

## Security and limitations

- The Edge Function validates the signed-in user and only accepts mono 16kHz 16-bit WAV, between 0.35 and 25 seconds.
- The browser converts the previously captured recording to WAV only if Azure is configured; the recording itself is not persisted by the new function.
- RLS is enabled on \`azure_pronunciation_usage_monthly\`; anon users cannot select the table or call the reservation RPC.
- The atomic database reservation caps attempted audio at 14,400 seconds (4h) per UTC month. Some time is reserved even for Azure errors to maintain conservative accounting.
- This guard is additional to the **F0 pricing tier**, and **cannot verify that the Azure resource is actually F0**. Azure Speech keys for S0 may still incur charges up to the local limit; verify pricing carefully.
- Azure F0 has concurrent-use limits; when Azure becomes unavailable, original Cloudflare ASR handles the request.
- The current integration maps existing 100%-word-gate semantics to \`score=100\` only when all expected words match and Azure's pronunciation scores meet thresholds. The actual Azure score is returned separately as \`pronunciation_score\`. That numeric gate is a compatibility contract, not an actual 100/100 pronunciation grade.
- Word-level scores are a best-effort AI estimate, not a definitive phonetics exam. Calibrate against real student recordings before high-stakes use.

## Verification checklist

- Azure credentials **unset**: GET \`/functions/v1/azure-pronounce-sentence\` with a valid Supabase JWT returns \`{"enabled":false}\`. Existing Cloudflare sentence grading unchanged.
- Azure credentials set, F0 selected: GET status returns enabled true.
- Record a correctly read 3–12 second English sentence on Android and iPhone; inspect returned \`scoring=azure-pronunciation-assessment-v1\` and \`word_scores\`.
- Intentionally omit a word: the exercise should not advance.
- Intentionally mispronounce a word: check that Azure returns the low-scoring word; this requires calibration.
- Disable the flag or exhaust the local reservation: existing Whisper fallback must continue working, without leaking credentials.
- Verify Azure F0 usage and Supabase guard counter independently after test.

Sources: Microsoft Learn's Speech short-audio REST API and pronunciation assessment documentation.
