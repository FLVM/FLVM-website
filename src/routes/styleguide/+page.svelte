<script>
	import OneCol from "$lib/components/layout/one-col.svelte"
</script>
<OneCol class="mt-8">
  <main>
    <div class="typo typo-lg mb-8">
      <h1>Guide de style</h1>
      <p>
        Page ayant pour objectif d'illustrer les choix graphiques.
        La configuration du thème peut se faire avec <a href="https://themes.skeleton.dev/themes/create">l'utilitaire de thème de Skeleton</a>
      </p>
      <p>
        Palettes de couleurs :
      </p>
      <ul>
        <li><a href="https://colordesigner.io/color-palette-builder?mode=lch&steps=10&him=constant#FFBF00-F2CF7D-FFE642-FF7700">Freshly squeezed</a></li>
        <li><a href="https://colordesigner.io/color-palette-builder?mode=lch&steps=10&him=constant#80EF80-E3F0A3-BADBA2-42D674">Pistachio dream</a></li>
        <li><a href="https://colordesigner.io/color-palette-builder?mode=lch&steps=10&him=constant#F2B949-EDD377-F2E829-F27430">Mango popsicle</a></li>
        <li><a href="https://colordesigner.io/color-palette-builder?mode=lch&steps=10&him=constant#FF8559-FFB578-E65447-CF5376">Guava</a></li>
      </ul>
      <ul>
        <li>Blueberry: #6B7A8F</li>
        <li>Apricot: #F7882F</li>
        <li>Citrus: #F7C331</li>
        <li>Apple Core: #DCC7AA</li>
      </ul>
    </div>
  
  
    <div class="typo typo-lg">
      <h2>Couleurs</h2>
      <p>Les couleurs et ses variantes utiliser compatible avec le mode sombre et lumineux du navigateur.</p>
    </div>
  
    <h3 class="h3 mt-6">Filled</h3>
    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
      <div class="preset-filled flex items-center justify-center p-4">(neutral)</div>
      <div class="preset-filled-primary-950-50 flex items-center justify-center p-4">950-50</div>
      <div class="preset-filled-primary-900-100 flex items-center justify-center p-4">900-100</div>
      <div class="preset-filled-primary-800-200 flex items-center justify-center p-4">800-200</div>
      <div class="preset-filled-primary-700-300 flex items-center justify-center p-4">700-300</div>
      <div class="preset-filled-primary-600-400 flex items-center justify-center p-4">600-400</div>
      <div class="preset-filled-primary-500 flex items-center justify-center p-4">500</div>
      <div class="preset-filled-primary-400-600 flex items-center justify-center p-4">400-600</div>
      <div class="preset-filled-primary-300-700 flex items-center justify-center p-4">300-700</div>
      <div class="preset-filled-primary-200-800 flex items-center justify-center p-4">200-800</div>
      <div class="preset-filled-primary-100-900 flex items-center justify-center p-4">100-900</div>
      <div class="preset-filled-primary-50-950 flex items-center justify-center p-4">50-950</div>
    </div>
    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
      <div class="preset-filled flex items-center justify-center p-4">(neutral)</div>
      <div class="preset-filled-secondary-950-50 flex items-center justify-center p-4">950-50</div>
      <div class="preset-filled-secondary-900-100 flex items-center justify-center p-4">900-100</div>
      <div class="preset-filled-secondary-800-200 flex items-center justify-center p-4">800-200</div>
      <div class="preset-filled-secondary-700-300 flex items-center justify-center p-4">700-300</div>
      <div class="preset-filled-secondary-600-400 flex items-center justify-center p-4">600-400</div>
      <div class="preset-filled-secondary-500 flex items-center justify-center p-4">500</div>
      <div class="preset-filled-secondary-400-600 flex items-center justify-center p-4">400-600</div>
      <div class="preset-filled-secondary-300-700 flex items-center justify-center p-4">300-700</div>
      <div class="preset-filled-secondary-200-800 flex items-center justify-center p-4">200-800</div>
      <div class="preset-filled-secondary-100-900 flex items-center justify-center p-4">100-900</div>
      <div class="preset-filled-secondary-50-950 flex items-center justify-center p-4">50-950</div>
    </div>
    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
      <div class="preset-filled flex items-center justify-center p-4">(neutral)</div>
      <div class="preset-filled-tertiary-950-50 flex items-center justify-center p-4">950-50</div>
      <div class="preset-filled-tertiary-900-100 flex items-center justify-center p-4">900-100</div>
      <div class="preset-filled-tertiary-800-200 flex items-center justify-center p-4">800-200</div>
      <div class="preset-filled-tertiary-700-300 flex items-center justify-center p-4">700-300</div>
      <div class="preset-filled-tertiary-600-400 flex items-center justify-center p-4">600-400</div>
      <div class="preset-filled-tertiary-500 flex items-center justify-center p-4">500</div>
      <div class="preset-filled-tertiary-400-600 flex items-center justify-center p-4">400-600</div>
      <div class="preset-filled-tertiary-300-700 flex items-center justify-center p-4">300-700</div>
      <div class="preset-filled-tertiary-200-800 flex items-center justify-center p-4">200-800</div>
      <div class="preset-filled-tertiary-100-900 flex items-center justify-center p-4">100-900</div>
      <div class="preset-filled-tertiary-50-950 flex items-center justify-center p-4">50-950</div>
    </div>    
  
    <h3 class="h3 mt-6">Tonal</h3>
    <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
      <div class="preset-tonal flex items-center justify-center p-4">(neutral)</div>
      <div class="preset-tonal-primary flex items-center justify-center p-4">primary</div>
      <div class="preset-tonal-secondary flex items-center justify-center p-4">secondary</div>
      <div class="preset-tonal-tertiary flex items-center justify-center p-4">tertiary</div>
      <div class="preset-tonal-success flex items-center justify-center p-4">success</div>
      <div class="preset-tonal-warning flex items-center justify-center p-4">warning</div>
      <div class="preset-tonal-error flex items-center justify-center p-4">error</div>
      <div class="preset-tonal-surface flex items-center justify-center p-4">surface</div>
    </div>
  
    <h3 class="h3 mt-6">Outlined</h3>
    <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 mb-6">
      <div class="preset-outlined flex items-center justify-center p-4">(neutral)</div>
      <div class="preset-outlined-primary-950-50 flex items-center justify-center p-4">950-50</div>
      <div class="preset-outlined-primary-900-100 flex items-center justify-center p-4">900-100</div>
      <div class="preset-outlined-primary-800-200 flex items-center justify-center p-4">800-200</div>
      <div class="preset-outlined-primary-700-300 flex items-center justify-center p-4">700-300</div>
      <div class="preset-outlined-primary-600-400 flex items-center justify-center p-4">600-400</div>
      <div class="preset-outlined-primary-500 flex items-center justify-center p-4">500</div>
      <div class="preset-outlined-primary-400-600 flex items-center justify-center p-4">400-600</div>
      <div class="preset-outlined-primary-300-700 flex items-center justify-center p-4">300-700</div>
      <div class="preset-outlined-primary-200-800 flex items-center justify-center p-4">200-800</div>
      <div class="preset-outlined-primary-100-900 flex items-center justify-center p-4">100-900</div>
      <div class="preset-outlined-primary-50-950 flex items-center justify-center p-4">50-950</div>
    </div>
    
    <h3 class="h3 mt-6">Boutons</h3>
    <div class="space-y-4">
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-primary-500">Button</button>
        <button type="button" class="btn preset-tonal-primary">Button</button>
        <button type="button" class="btn preset-outlined-primary-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-secondary-500">Button</button>
        <button type="button" class="btn preset-tonal-secondary">Button</button>
        <button type="button" class="btn preset-outlined-secondary-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-tertiary-500">Button</button>
        <button type="button" class="btn preset-tonal-tertiary">Button</button>
        <button type="button" class="btn preset-outlined-tertiary-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-success-500">Button</button>
        <button type="button" class="btn preset-tonal-success">Button</button>
        <button type="button" class="btn preset-outlined-success-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-warning-500">Button</button>
        <button type="button" class="btn preset-tonal-warning">Button</button>
        <button type="button" class="btn preset-outlined-warning-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-error-500">Button</button>
        <button type="button" class="btn preset-tonal-error">Button</button>
        <button type="button" class="btn preset-outlined-error-500">Button</button>
      </div>
      <div class="flex gap-4">
        <button type="button" class="btn preset-filled-surface-500">Button</button>
        <button type="button" class="btn preset-tonal-surface">Button</button>
        <button type="button" class="btn preset-outlined-surface-500">Button</button>
      </div>
    </div>
  
  
    <div class="typo typo-lg my-6">
      <h2>Style typographique</h2>
      <p>
        Applique les style typographiques de <a href="https://www.skeleton.dev/docs/design/typography">Skeleton Typography</a> via la classe utilitaire <code>.typo</code>.
      </p>
      <p>
        Deux classes utilitaires de variantes sont disponible <code>.typo-lg</code> et <code>.typo-sm</code>
      </p>
    </div>
  
    <div class="mb-12 max-w-sm typo typo-sm">
      <pre>.typo .typo-sm</pre>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <p>
       Alice était fatiguée de rester auprès de sa sœur ; elle regarda autour d'elle et vit un Lapin Blanc courir.
      </p>
      <p>
        Le Lapin tira une montre et murmura qu'il allait être en retard ; il disparut dans un terrier.
      </p>
      <p>
        En tombant, Alice vit des étagères, des tableaux et des lampes le long de la galerie.
      </p>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <h2>Alice et le lapin blanc<br/>Sur deux lignes</h2>
      <h3>Alice et le lapin blanc<br/>Sur deux lignes</h3>
      <h4>Alice et le lapin blanc<br/>Sur deux lignes</h4>
      <h5>Alice et le lapin blanc<br/>Sur deux lignes</h5>
      <h6>Alice et le lapin blanc<br/>Sur deux lignes</h6>
    </div>
    <div class="mb-12 max-w-md typo">
      <pre>.typo</pre>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <p>
       Alice était fatiguée de rester auprès de sa sœur ; elle regarda autour d'elle et vit un Lapin Blanc courir.
      </p>
      <p>
        Le Lapin tira une montre et murmura qu'il allait être en retard ; il disparut dans un terrier.
      </p>
      <p>
        En tombant, Alice vit des étagères, des tableaux et des lampes le long de la galerie.
      </p>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <h2>Alice et le lapin blanc<br/>Sur deux lignes</h2>
      <h3>Alice et le lapin blanc<br/>Sur deux lignes</h3>
      <h4>Alice et le lapin blanc<br/>Sur deux lignes</h4>
      <h5>Alice et le lapin blanc<br/>Sur deux lignes</h5>
      <h6>Alice et le lapin blanc<br/>Sur deux lignes</h6>
    </div>
    <div class="mb-12 max-w-lg typo typo-lg">
      <pre>.typo .typo-lg</pre>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <p>
       Alice était fatiguée de rester auprès de sa sœur ; elle regarda autour d'elle et vit un Lapin Blanc courir.
      </p>
      <p>
        Le Lapin tira une montre et murmura qu'il allait être en retard ; il disparut dans un terrier.
      </p>
      <p>
        En tombant, Alice vit des étagères, des tableaux et des lampes le long de la galerie.
      </p>
      <h1>Alice et le lapin blanc<br/>Sur deux lignes</h1>
      <h2>Alice et le lapin blanc<br/>Sur deux lignes</h2>
      <h3>Alice et le lapin blanc<br/>Sur deux lignes</h3>
      <h4>Alice et le lapin blanc<br/>Sur deux lignes</h4>
      <h5>Alice et le lapin blanc<br/>Sur deux lignes</h5>
      <h6>Alice et le lapin blanc<br/>Sur deux lignes</h6>
    </div>
  
  </main>
</OneCol>