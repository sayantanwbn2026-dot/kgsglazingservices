import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen } from "lucide-react";

export const Route = createFileRoute("/admin/enquiries")({
  component: EnquiriesPage,
});

function EnquiriesPage() {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["cms", "enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as any[]) ?? [];
    },
  });

  const toggleRead = useMutation({
    mutationFn: async (r: any) => {
      const { error } = await supabase
        .from("enquiries" as any)
        .update({ read_at: r.read_at ? null : new Date().toISOString() })
        .eq("id", r.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms", "enquiries"] }),
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("enquiries" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cms", "enquiries"] }); toast.success("Deleted"); },
    onError: (e: any) => toast.error(e.message ?? "Failed"),
  });

  const unread = (rows as any[]).filter((r) => !r.read_at).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display-sub text-[28px]">Enquiries</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-dim">
          Consultation form submissions from the website. {unread > 0 && (
            <span className="text-brass font-medium">{unread} unread</span>
          )}
        </p>
      </header>

      {isLoading ? (
        <div className="rounded-2xl border border-line bg-surface p-6 text-ink-mute text-sm">Loading…</div>
      ) : (rows as any[]).length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <div className="font-display text-[15px] font-semibold">No enquiries yet</div>
          <div className="mt-1.5 text-[13px] text-ink-dim">Submissions from the homepage consultation form will appear here.</div>
        </div>
      ) : (
        <div className="space-y-3">
          {(rows as any[]).map((r) => (
            <article
              key={r.id}
              className={`rounded-2xl border bg-surface p-5 md:p-6 ${r.read_at ? "border-line" : "border-brass/40 bg-brass-soft/30"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-[15px] font-semibold tracking-tight text-ink truncate">
                      {r.name || "Anonymous"}
                    </span>
                    {!r.read_at && (
                      <span className="px-1.5 py-0.5 rounded-full bg-brass text-white text-[9.5px] font-mono uppercase tracking-wider">New</span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-ink-dim">
                    {r.org || "—"} · {new Date(r.created_at).toLocaleString()}
                  </div>
                  {(r.email || r.phone) && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px]">
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="text-brass hover:underline break-all">
                          {r.email}
                        </a>
                      )}
                      {r.phone && (
                        <a href={`tel:${r.phone}`} className="text-ink-dim hover:text-ink">
                          {r.phone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleRead.mutate(r)}
                    title={r.read_at ? "Mark unread" : "Mark read"}
                    className="p-2 rounded-md hover:bg-surface-2 text-ink-dim hover:text-ink transition"
                  >
                    {r.read_at ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => { if (confirm("Delete this enquiry?")) remove.mutate(r.id); }}
                    className="p-2 rounded-md hover:bg-red-50 text-ink-dim hover:text-red-600 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-[12.5px]">
                <Field k="Project type" v={r.project} />
                <Field k="Location" v={r.location} />
                <Field k="Budget" v={r.budget} />
              </dl>
              {r.message && (
                <div className="mt-4 border-t border-line pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute mb-1.5">Brief</div>
                  <p className="text-[13.5px] text-ink whitespace-pre-wrap">{r.message}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ k, v }: { k: string; v?: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">{k}</dt>
      <dd className="mt-0.5 text-ink">{v || "—"}</dd>
    </div>
  );
}