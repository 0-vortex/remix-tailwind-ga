# Tailwindcss Example

Integrate Remix with tailwindcss.

This example shows how to use Tailwind CSS (v3.0) with Remix. It follows the steps outlined in the official [Remix Styling docs](https://remix.run/guides/styling#tailwind).

Relevant files:

- [package.json](./package.json) where the tailwind CLI is used.
- [tailwind.config.ts](./tailwind.config.ts) where tailwind is configured.
- [app/root.tsx](./app/root.tsx) where tailwind is imported.
- [.gitignore](.gitignore) where the generated tailwind.css is added to the ignore list.

## Development

Clone the project and spin it up:

```bash
npm ci
npm run dev
```

# GraphAware

## Issues / Errors

- state management is not implemented
- focused too much on UI
- types are incomplete
- parent ref is not working

## Total Time taken

- Recursive table initial setup: 3h 19m
- Splitting components and refactor: 1h 17m

![Screenshot 2023-11-06 at 16.52.41.png](public%2FScreenshot%202023-11-06%20at%2016.52.41.png)

## Final thoughts

Would start over with implementing the state management through default store or Redux  
and focusing on compomnent structure and recursion later on.
