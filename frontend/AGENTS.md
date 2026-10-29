<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All product/order data access goes through src/lib/api.ts (Django REST endpoints via VITE_API_BASE_URL; sample data fallback in src/lib/sample-data.ts) — keeps the frontend swappable to the real backend.
- No Lovable Cloud/Supabase/Firebase: the backend is a separate Django REST API by user requirement.
