const Header = () => {
  return (
    <header className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-xs text-bib tracking-widest uppercase mb-1">Maratón G31 - 2026</p>
        <h1 className="text-3xl font-semibold tracking-tight">Corredores</h1>
      </div>
      <div className="text-right shrink-0">
        <p id="contador" className="text-3xl font-semibold leading-none">0</p>
        <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">inscritos</p>
      </div>
    </header>
  )
}

export default Header