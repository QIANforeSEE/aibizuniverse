import { createFileRoute } from "@tanstack/react-router";
import { validateUpload } from "@/lib/upload-validation";

export const Route = createFileRoute("/api/upload-validate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown = null;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { ok: false, errors: [{ field: "_", message: { cn: "无效的请求体", en: "Invalid request body" } }] },
            { status: 400 },
          );
        }
        const errors = validateUpload(body);
        if (errors.length > 0) {
          return Response.json({ ok: false, errors }, { status: 422 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
