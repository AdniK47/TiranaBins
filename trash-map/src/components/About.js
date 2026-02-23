import React, { useEffect, useRef } from "react";
import "../style/About.css";

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // set a small translate value for subtle parallax accent
      el.style.setProperty("--scroll", `${Math.min(scrollY / 8, 200)}px`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initialize
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="about-container" ref={rootRef} aria-labelledby="about-title">
      <div className="about-inner">
        <h1 id="about-title" className="about-title">Misioni dhe Qëllimet e TiranaBin</h1>

        <div className="about-body">
          <p>
            TiranaBin lindi nga dëshira për të bërë qytetin tonë më të pastër dhe më të sigurt. Ne besojmë se
            informacioni i hapur dhe bashkëpunimi i komunitetit janë çelësi për të zgjidhur problemet e mbeturinave në
            hapësirat publike. Kjo platformë synon të lidhë qytetarët, vullnetarët dhe autoritetet lokale për të
            identifikuar, raportuar dhe organizuar pastrime lokale.
          </p>

          <p>
            Motivimi ynë vjen nga përvoja e përditshme: rrugë të ndotura, kosha të mbushura dhe mungesa e informacionit
            të përbashkët për vendndodhjet e pikave të mbeturinave. Me TiranaBin duam të ofrojmë një mjet të thjeshtë,
            të besueshëm dhe të aksesueshëm për të gjithë, që të lehtësojë raportimin dhe koordinimin e pastrimeve.
          </p>

          <p>
            Qëllimet tona kryesore janë: të rrisim ndërgjegjësimin qytetar, të përmirësojmë mbledhjen dhe riciklimin e
            mbeturinave, dhe të krijojmë një hartë dinamike që ndihmon në planifikimin e ndërhyrjeve lokale. Ne synojmë
            gjithashtu të bashkëpunojmë me shkolla, organizata joqeveritare dhe autoritete komunale për të ndërtuar zgjidhje
            afatgjata.
          </p>
        </div>

        <div className="about-features" role="list" aria-label="Mënyrat tona">
          <article className="feature" role="listitem">
            <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="#34d399" d="M12 2C7 7 4 9 4 13c0 4 4 7 8 7s8-3 8-7c0-4-3-6-8-11z"/>
            </svg>
            <h3>Raportim i thjeshtë</h3>
            <p>Regjistro vendndodhjen e koshave dhe pikat problematike me disa klikime.</p>
          </article>

          <article className="feature" role="listitem">
            <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10" fill="#06b6d4"/>
            </svg>
            <h3>Harta dinamike</h3>
            <p>Shiko vendndodhjet e raportuara në hartë dhe planifiko pastrime lokale.</p>
          </article>

          <article className="feature" role="listitem">
            <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="6" y="7" width="12" height="12" rx="2" fill="#f59e0b"/>
              <rect x="9" y="3" width="6" height="2" rx="1" fill="#f59e0b"/>
            </svg>
            <h3>Bashkëpunim komunitar</h3>
            <p>Organizo vullnetarë, ndaje ngjarje pastrimi dhe ndiq ndikimin e përbashkët.</p>
          </article>
        </div>
      </div>
    </section>
  );
}


