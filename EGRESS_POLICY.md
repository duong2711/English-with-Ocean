# LDD English — Supabase Egress Policy

Project constraint: Supabase egress is limited, so network usage must be treated as a scarce resource.

## Default rule

Use the browser first. Use Supabase only when data must be persisted, authenticated, or synchronized between devices/users.

## Preferred order

1. Pure UI, animation, countdowns, deterministic calculations → local JavaScript only.
2. Data already fetched in the current session → reuse/cache locally.
3. Data changed by the current user's action → update UI optimistically, then persist once.
4. Shared live state → one initial fetch + narrowly scoped Realtime subscription.
5. Periodic polling → last resort only, with a documented reason and a conservative interval.

## Never poll for

- animations or car/obstacle positions
- countdown clocks
- deterministic obstacle lanes
- tab/folder visual state
- 7/14-day reset deadlines after the deadline has already been fetched
- session presence when local auth storage/events are sufficient

## Realtime

- Subscribe only while the feature is active.
- Filter by the smallest available scope, e.g. `room_id` or the current user's rows.
- Unsubscribe when leaving the feature.
- Prefer one initial query followed by Realtime instead of repeated REST queries.
- Race tables are never cached because multiplayer state must stay live.

## REST GET caching

`ldd-egress-guard.js` provides short-lived in-memory caching and in-flight request deduplication for safe Supabase REST GET requests.

- Static content can have long TTLs.
- User progress uses short TTLs.
- Writes invalidate the cache for the affected table.
- Known UI change events invalidate related progress caches.
- A request can bypass the cache with `cache: 'no-store'` or header `x-ldd-fresh: 1` when freshness is truly required.

## Writes

- Do not write animation/frame/timer state to Supabase.
- Batch or debounce repeated writes where correctness allows it.
- Do not re-fetch a full table immediately after a write when the UI can be updated from the known result.

## Query shape

- Select only columns that the current UI needs.
- Filter by `user_id`, `room_id`, grade, date, or other narrow keys whenever possible.
- Use `limit` for lists where the UI only displays a small number of rows.
- Avoid downloading large JSON/content fields merely to compute a count if a smaller query or local known value is enough.

## Current high-impact optimizations

- Vocab Race: no 900ms REST room/player polling; initial fetch + scoped Realtime.
- THCS/THPT reset: no 30-second DB polling; next 7/14-day deadline is scheduled locally.
- Dashboard/Fast Progress: repeated identical REST reads are deduplicated/cached by Egress Guard.
- Static learning content receives longer cache TTLs than user progress.

## Review rule

Before adding a new Supabase call, answer these questions:

1. Can this be computed locally?
2. Do we already have this data in memory?
3. Can an existing event update the UI instead of a re-fetch?
4. If synchronization is required, can Realtime replace polling?
5. Is the selected payload the minimum data needed?

If the answer to any earlier option is yes, prefer it over another network request.
