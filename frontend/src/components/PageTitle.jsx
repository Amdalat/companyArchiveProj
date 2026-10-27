export default function PageTitle({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      
      {action}
    </div>);
}
