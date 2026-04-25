import type { Application } from "./types";

interface AdminApplicationsProps {
  applications: Application[];
  loading: boolean;
  deleteApplication: (id: number) => void;
}

export default function AdminApplications({ applications, loading, deleteApplication }: AdminApplicationsProps) {
  return (
    <>
      {loading ? (
        <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
          Загрузка...
        </p>
      ) : applications.length === 0 ? (
        <p className="text-center py-8" style={{ color: "rgba(61,61,61,0.5)" }}>
          Нет заявок
        </p>
      ) : (
        <div className="space-y-3">
          {applications.map((a) => (
            <article
              key={a.id}
              className="bg-white rounded-2xl p-5"
              style={{ border: "2px solid #FFE5D9" }}
            >
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <div className="font-black text-lg" style={{ color: "#3D3D3D" }}>
                    {a.full_name}
                    {a.age && (
                      <span className="font-normal ml-2 text-sm" style={{ color: "rgba(61,61,61,0.6)" }}>
                        · {a.age} лет
                      </span>
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "rgba(61,61,61,0.5)" }}>
                    {new Date(a.created_at).toLocaleString("ru-RU")}
                  </div>
                </div>
                <button
                  onClick={() => deleteApplication(a.id)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "#FEE2E2", color: "#991B1B" }}
                >
                  🗑 Удалить
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm" style={{ color: "rgba(61,61,61,0.85)" }}>
                <div>
                  <span className="font-bold" style={{ color: "#FF9A56" }}>
                    📞 Телефон:
                  </span>{" "}
                  <a href={`tel:${a.phone}`} className="font-semibold" style={{ color: "#3D3D3D" }}>
                    {a.phone}
                  </a>
                </div>
                {a.email && (
                  <div>
                    <span className="font-bold" style={{ color: "#FF9A56" }}>
                      ✉️ Email:
                    </span>{" "}
                    <a href={`mailto:${a.email}`} className="font-semibold" style={{ color: "#3D3D3D" }}>
                      {a.email}
                    </a>
                  </div>
                )}
                {a.about && (
                  <div className="md:col-span-2">
                    <span className="font-bold" style={{ color: "#FF9A56" }}>
                      🌟 О себе:
                    </span>{" "}
                    {a.about}
                  </div>
                )}
                {a.experience && (
                  <div className="md:col-span-2">
                    <span className="font-bold" style={{ color: "#FF9A56" }}>
                      💼 Опыт:
                    </span>{" "}
                    {a.experience}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
