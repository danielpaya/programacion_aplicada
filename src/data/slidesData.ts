export interface SlideMeta {
  id: number;
  sectionTag: string | null;
  shortTitle: string;
  title: string;
  durationSeconds: number;
  cumulativeSeconds: number;
  durationLabel: string;
  cumulativeLabel: string;
  speakerNotes: string;
  speakerKeyHighlight?: string;
}

export const TOTAL_PRESENTATION_SECONDS = 900; // 15 minutos exactos (900 s)

export function formatSecondsToMMSS(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const rawSlides: Omit<SlideMeta, 'cumulativeSeconds' | 'cumulativeLabel'>[] = [
  {
    id: 1,
    sectionTag: null,
    shortTitle: 'Portada',
    title: 'De reaccionar a anticipar',
    durationSeconds: 20,
    durationLabel: '20 s',
    speakerKeyHighlight: 'Hoy les mostramos cómo convertir los datos que ya tienen en decisiones antes de que el problema ocurra.',
    speakerNotes:
      'Buenos días, miembros de la junta directiva. Hoy les mostramos cómo convertir los datos que ya tienen en decisiones antes de que el problema ocurra. En los próximos 15 minutos les presentaremos nuestra respuesta a la licitación LP-2026-01 para proteger la rentabilidad y la lealtad de Mercados La Pradera.'
  },
  {
    id: 2,
    sectionTag: 'a. Resumen ejecutivo',
    shortTitle: 'Resumen ejecutivo',
    title: 'Cuatro modelos para recuperar la mitad de una brecha de 230.000 millones en 12 meses',
    durationSeconds: 60,
    durationLabel: '60 s',
    speakerKeyHighlight: 'Recuperar ≈ 115.000 M COP/año al mes 12 con una inversión de ≈ 5.200 M, y aplazar recortes hasta la revisión del mes 6.',
    speakerNotes:
      'Empecemos por la conclusión. Durante el último año, nuestros cuatro indicadores críticos se deterioraron de forma continua porque pedimos mercancía mirando hacia atrás y controlamos tarde. Nuestra propuesta conecta cuatro modelos de aprendizaje supervisado: uno que calcula cuántas unidades pedir y tres que anticipan qué lotes van a vencer, qué afiliados están por irse y qué transacciones requieren revisión. Con una inversión estimada de 5.200 millones, proyectamos recuperar cerca de 115.000 millones de pesos anuales al llegar al mes 12, la mitad del costo de la brecha. Somos honestos: ninguna alternativa, tampoco los recortes, cumple las metas de 2026 en los tres meses que quedan del año; las metas completas las alcanzamos entre los meses 18 y 24. Por eso hoy les proponemos aprobar este programa y aplazar el cierre de tiendas y los recortes a Pradera Plus hasta la revisión del mes 6.'
  },
  {
    id: 3,
    sectionTag: 'b. Diagnóstico',
    shortTitle: 'Costo de la brecha',
    title: 'La brecha de 4 indicadores cuesta 230.000 millones de pesos al año',
    durationSeconds: 50,
    durationLabel: '50 s',
    speakerKeyHighlight: '≈ 230.000 M COP/año, más que la utilidad operativa de 2024 y del primer semestre de 2026 juntos.',
    speakerNotes:
      'Dimensionemos el tamaño del problema. Cuando sumamos la distancia entre donde estamos hoy y las metas de la junta en los cuatro indicadores, la brecha nos cuesta aproximadamente 230.000 millones de pesos al año. Eso es más que la utilidad operativa de todo 2024 y la del primer semestre de 2026 juntas. Noten además dónde se concentra el impacto: el abandono de afiliados en Pradera Plus representa 145.000 millones, seguido por el quiebre de inventario con 52.000 millones, la merma de perecederos con 24.000 millones y el fraude con 8.800 millones.'
  },
  {
    id: 4,
    sectionTag: 'b. Diagnóstico',
    shortTitle: 'Tendencia trimestral',
    title: 'Los cuatro indicadores empeoraron cuatro trimestres seguidos',
    durationSeconds: 30,
    durationLabel: '30 s',
    speakerKeyHighlight: 'A este ritmo, el quiebre cerraría 2026 por encima del 11 %.',
    speakerNotes:
      'No se trata de un tropiezo estacional. Como vemos en los cuatro gráficos, desde el tercer trimestre de 2025 hasta el segundo de 2026 todos los indicadores se alejaron de la línea punteada de la meta. A este ritmo, el quiebre cerraría 2026 por encima del 11 %, arrastrando consigo más pérdida de clientes y mayor desperdicio.'
  },
  {
    id: 5,
    sectionTag: 'b. Diagnóstico',
    shortTitle: 'Causas raíz',
    title: 'Dos causas raíz: pedimos mirando hacia atrás y controlamos tarde',
    durationSeconds: 50,
    durationLabel: '50 s',
    speakerKeyHighlight: 'El plan de recortes ataca síntomas; reducir Pradera Plus aceleraría el abandono, que es el 63 % de la brecha.',
    speakerNotes:
      '¿Por qué empeoran al mismo tiempo problemas que parecen distintos? La primera causa es que pedimos por intuición y copiando el mismo mes del año pasado, sin anticipar quincenas, festivos ni promociones. Eso deja góndolas vacías en lo que sí se vende y exceso de perecederos en lo que no rota. Esas góndolas vacías son el primer motivo por el que los afiliados se van, según las encuestas de salida. La segunda causa es que controlamos tarde: los descuentos por vencimiento llegan tarde y son iguales en todas las tiendas, lo que terminó en la foto del contenedor con fruta en buen estado; y el fraude se revisa a mano, semanas después, sobre el 2 % de las transacciones. El plan de recortes ataca síntomas; reducir Pradera Plus aceleraría el abandono, que es el 63 % de la brecha.'
  },
  {
    id: 6,
    sectionTag: 'b. Alineación con los OKR',
    shortTitle: 'Alineación OKR',
    title: 'La propuesta mueve los 4 resultados clave, no solo los 3 mínimos',
    durationSeconds: 50,
    durationLabel: '50 s',
    speakerKeyHighlight: 'Cada KR tiene un modelo responsable y una meta al mes 12; la meta OKR completa llega entre los meses 18 y 24.',
    speakerNotes:
      'Aunque el pliego exigía cubrir como mínimo tres resultados clave, atacamos los cuatro porque en la operación están conectados. La tabla muestra, para cada resultado clave, qué modelo lo mueve y cuánto esperamos moverlo al mes 12: el quiebre de 9,8 a 6,5 %, la merma de 7,3 a 4,5 %, el abandono de 23 a 18 % y el fraude de 0,95 a 0,75 %. El pronóstico de demanda tiene un efecto multiplicador: al acertar cuánto pedir, reduce el quiebre, evita el sobrepedido que genera merma y elimina el principal motivo de abandono. Las metas completas de los OKR las alcanzamos entre los meses 18 y 24, cuando los cuatro modelos lleven un año completo operando en las 48 tiendas.'
  },
  {
    id: 7,
    sectionTag: 'c. Casos de uso',
    shortTitle: 'Casos de uso',
    title: 'Cuatro modelos que anticipan en lugar de reportar',
    durationSeconds: 70,
    durationLabel: '70 s',
    speakerKeyHighlight: 'Si la respuesta es una cantidad → regresión. Si es sí/no → clasificación.',
    speakerNotes:
      'Traduzcamos esto a decisiones concretas en tienda. La regla es sencilla: si la pregunta se responde con una cantidad, usamos regresión; si se responde con un sí o un no, usamos clasificación. En el caso 1 preguntamos cuántas unidades pedirán los clientes en los próximos 14 días por tienda y producto; ojo, demanda y no venta, porque cuando hay quiebre la venta es cero aunque el cliente sí vino a buscar el producto. Es regresión y entrega un pedido sugerido. En el caso 2 preguntamos si un lote se vencerá sin venderse en 3 días: es clasificación porque la decisión en tienda es binaria, actuar o no, y activa un descuento, traslado o donación a tiempo. En el caso 3 preguntamos si un afiliado hará cero compras en los próximos 90 días, para enviarle una acción de retención antes de perderlo. Y en el caso 4 separamos pagos y devoluciones en dos submodelos, porque el fraude se comporta distinto en cada uno; las alertas van a revisión humana, nunca a un bloqueo en caja.'
  },
  {
    id: 8,
    sectionTag: 'd. Algoritmos',
    shortTitle: 'Algoritmos',
    title: 'Un modelo simple como referencia y uno más potente que explica sus alertas',
    durationSeconds: 70,
    durationLabel: '70 s',
    speakerKeyHighlight: 'Bosque aleatorio = consultar a cien administradores expertos en lugar de uno. Cada alerta muestra sus 3 razones principales.',
    speakerNotes:
      'Para cada caso de uso construimos primero un modelo sencillo y transparente como referencia, y solo adoptamos el bosque aleatorio si lo supera en datos que el modelo nunca vio. ¿Qué es un bosque aleatorio? Equivale a consultar a cien administradores expertos en lugar de uno y combinar sus criterios. En demanda, entiende que quincena, festivo y promoción no solo se suman, sino que se potencian entre sí, y maneja bien 1,8 millones de combinaciones de tienda y producto. En lotes por vencer, captura que el riesgo se dispara en los últimos días; como solo hay 18 meses de datos, si no supera a la regresión logística, nos quedamos con la logística. En abandono, el bosque señala quién se va y la logística explica por qué, para que mercadeo ataque el motivo correcto. En fraude, ajustamos el peso de los casos para que el modelo no aprenda el camino fácil de decir siempre que todo está bien. Y para que nadie decida a ciegas, cada alerta muestra sus tres razones principales. Descartamos vecinos más cercanos porque sería lento con millones de registros y no da razones.'
  },
  {
    id: 9,
    sectionTag: 'e. Datos requeridos',
    shortTitle: 'Datos requeridos',
    title: 'Cada modelo usa datos que La Pradera ya tiene',
    durationSeconds: 40,
    durationLabel: '40 s',
    speakerKeyHighlight: 'No compramos fuentes externas; en CU4 excluimos barrio, ubicación y sus variables sustitutas por diseño.',
    speakerNotes:
      'No necesitamos comprar bases de datos externas: la materia prima ya está en casa. Para demanda usamos 5 años de ventas, el calendario comercial e inventarios, que además nos dicen qué días no hubo existencias para no confundir quiebre con falta de demanda. Para merma sumamos los 18 meses de vencimientos, los registros de merma con los que hoy se mide el indicador y el pronóstico del primer modelo. Para abandono usamos los 6 años de Pradera Plus y cruzamos la canasta habitual de cada cliente con los días sin existencias para saber qué quiebres vivió. Y para fraude usamos 2 años de pagos y devoluciones, dejando por fuera el barrio, la ubicación y cualquier variable que los sustituya.'
  },
  {
    id: 10,
    sectionTag: 'e. Plan de preparación',
    shortTitle: 'Preparación de datos',
    title: 'Dos meses para limpiar y unificar los datos',
    durationSeconds: 50,
    durationLabel: '50 s',
    speakerKeyHighlight: '7 tareas de calidad con regla concreta; el histórico de fraude de 12 tiendas no se usa para entrenar.',
    speakerNotes:
      'Antes de entrenar cualquier modelo ordenamos la casa en los dos primeros meses, y cada problema tiene una regla concreta. En el mes 1 unificamos los códigos de producto en una tabla maestra y llevamos todos los sí/no a un único formato. Los campos vacíos de inventario se completan con el promedio de la misma tienda, producto y semana, marcados como estimados. Los afiliados duplicados se fusionan por documento y nombre aproximado, con revisión manual de los casos dudosos. Reconstruimos la demanda de los días con quiebre para no enseñarle al modelo que nadie quería el producto. Para vencimientos entrenamos con el 60 % de tiendas digitales, verificando que representen todas las ciudades y tamaños, mientras digitalizamos el resto al mes 6. Y desde el primer día hacemos auditoría aleatoria en las 48 tiendas.'
  },
  {
    id: 11,
    sectionTag: 'f. Medición del éxito',
    shortTitle: 'Medición del éxito',
    title: 'Un modelo solo se escala si mueve el KPI en el piloto',
    durationSeconds: 80,
    durationLabel: '80 s',
    speakerKeyHighlight: 'Precisión = de cada 10 alertas, cuántas eran reales. Sensibilidad = de cada 10 casos reales, cuántos detectamos.',
    speakerNotes:
      'Nuestro compromiso es claro: ningún modelo se escala por verse bien en el computador; solo si mueve el indicador en tiendas reales. Usamos dos conceptos simples: la precisión dice, de cada 10 alertas, cuántas eran reales; la sensibilidad dice, de cada 10 casos reales, cuántos detectamos a tiempo. En demanda exigimos 25 % menos error que el método actual y menos quiebre en 8 tiendas piloto frente a 8 tiendas espejo; esa es la ruta para pasar de 9,8 a 6,5 %. En merma exigimos detectar 7 de cada 10 lotes en riesgo, con al menos la mitad de alertas acertadas; si rescatamos la mitad de lo alertado, la merma baja a 4,5 %. En abandono exigimos que el modelo ponga primero al cliente que sí se va en 3 de cada 4 comparaciones, y lo probamos con un grupo de control. En fraude exigimos detectar 6 de cada 10 casos y que al menos 1 de cada 3 alertas sea real, para no molestar clientes honestos. Nunca usamos la exactitud global: con menos del 1 % de fraude, un modelo que nunca detecta nada tendría 99 %. Siempre validamos con meses posteriores al entrenamiento.'
  },
  {
    id: 12,
    sectionTag: 'g. Plan de implementación',
    shortTitle: 'Cronograma 12M',
    title: 'Empezamos por la demanda; la junta decide el escalamiento en el mes 6',
    durationSeconds: 60,
    durationLabel: '60 s',
    speakerKeyHighlight: 'Hito M6: la junta decide escalar CU1 y CU2 con resultados medidos en tiendas piloto.',
    speakerNotes:
      'Organizamos los 12 meses para generar caja y confianza rápido. Después de alistar los datos en los meses 1 y 2, arrancamos con el modelo de demanda porque impacta tres de los cuatro indicadores y cuenta con 5 años de datos. Luego escalonamos merma y abandono. El modelo de fraude se construye a partir del mes 6 porque primero necesitamos 5 meses de auditoría aleatoria en las 48 tiendas para tener datos sin sesgo. Fíjense en el mes 6: nada se escala a toda la cadena antes de esa fecha. Ahí nos sentamos con ustedes, con resultados medidos en las tiendas piloto, y la junta decide si demanda y merma pasan a las 48 tiendas.'
  },
  {
    id: 13,
    sectionTag: 'g. Entregables',
    shortTitle: 'Entregables y compuertas',
    title: 'Cada fase entrega algo concreto y tiene una compuerta para avanzar',
    durationSeconds: 40,
    durationLabel: '40 s',
    speakerKeyHighlight: '6 compuertas objetivas de calidad y negocio; transferencia total al equipo interno en M10–M12.',
    speakerNotes:
      'Para proteger la inversión, cada etapa entrega una herramienta concreta y tiene una compuerta: si no se cumple la meta, no se pasa a la siguiente fase. Pasamos de la tabla maestra con menos de 2 % de errores, al pedido sugerido en tienda, las alertas diarias de perecederos, las listas semanales de retención y la bandeja de auditoría, que solo avanza si cumple las metas de detección y de equidad. Entre los meses 10 y 12 entregamos el tablero ejecutivo y dejamos al equipo interno capacitado para operar y reentrenar los modelos sin depender de nosotros.'
  },
  {
    id: 14,
    sectionTag: 'h. Sesgos y ética',
    shortTitle: 'Sesgos y ética',
    title: 'El modelo de fraude revisa conductas, no barrios',
    durationSeconds: 70,
    durationLabel: '70 s',
    speakerKeyHighlight: 'Rechazamos restringir devoluciones por barrio; el histórico sesgado no entrena el modelo y vigilamos variables sustitutas.',
    speakerNotes:
      'Queremos detenernos en un punto ético fundamental. Hasta hoy, la auditoría manual se concentró en 12 tiendas de sectores populares. Si entrenáramos un modelo con esa historia, aprendería equivocadamente que barrio popular equivale a fraude, y crearía un círculo vicioso: más alertas allí, más auditoría allí y más casos confirmados solo allí. Por eso rechazamos restringir devoluciones por barrio y aplicamos cuatro candados. Uno: auditoría aleatoria en las 48 tiendas, y el histórico sesgado no se usa para entrenar. Dos: prohibimos barrio, ubicación y estrato, y revisamos que otras variables, como el medio de pago o el monto, no los estén reemplazando por la puerta de atrás. Tres: cada mes medimos que las falsas alarmas no difieran en más de 2 puntos entre tiendas. Y cuatro: cuando el modelo opere, al menos 20 % de la auditoría seguirá siendo al azar, para seguir detectando lo que el modelo no ve.'
  },
  {
    id: 15,
    sectionTag: 'h. Rol humano, privacidad y riesgos',
    shortTitle: 'Rol humano y riesgos',
    title: 'El modelo recomienda; la persona decide',
    durationSeconds: 55,
    durationLabel: '55 s',
    speakerKeyHighlight: 'Cumplimiento de la Ley 1581 de 2012 y supervisión humana en los 4 casos de uso.',
    speakerNotes:
      'Nuestra regla de oro es que la tecnología recomienda, pero la persona decide. El administrador de tienda tiene la última palabra para ajustar un pedido o decidir si rebaja, traslada o dona un lote apto para consumo; mercadeo define qué oferta enviar, con las mismas reglas para todos los segmentos; y en fraude jamás bloqueamos a un cliente en la caja: un auditor humano revisa el caso. Cumplimos la Ley 1581 de protección de datos: usamos solo afiliados con autorización vigente, códigos en lugar de nombres y respetamos el derecho a revocar. Finalmente, mitigamos tres riesgos del proyecto: sumamos administradores voluntarios desde el piloto, reforzamos el equipo de dos analistas con tres especialistas y reentrenamos los modelos cada mes.'
  },
  {
    id: 16,
    sectionTag: 'i. Beneficios esperados',
    shortTitle: 'Beneficios esperados',
    title: 'Al mes 12 recuperamos la mitad del costo de la brecha',
    durationSeconds: 70,
    durationLabel: '70 s',
    speakerKeyHighlight: '≈ 115.000 M COP/año recuperados al mes 12 → ≈ 35.000 M de utilidad operativa frente a ≈ 5.200 M de inversión.',
    speakerNotes:
      'Veamos el retorno al mes 12. Con las metas intermedias —abandono en 18 %, quiebre en 6,5 %, merma en 4,5 % y fraude en 0,75 %— alcanzamos un ritmo de recuperación anual de cerca de 115.000 millones de pesos, la mitad del costo de la brecha: 66.000 millones por retención de afiliados, 29.700 millones en ventas que dejamos de perder en góndola, 15.700 millones en perecederos que no se pierden y 3.200 millones en menor fraude. Fuimos conservadores en tres supuestos: sobre las ventas recuperadas solo contamos un margen bruto del 25 %; la merma evitada la contamos a la mitad de su valor, porque lo que se rebaja o se dona no recupera el precio completo; y el fraude es la meta más modesta porque ese modelo apenas escala en los meses 11 y 12. Así, el impacto en utilidad operativa es de unos 35.000 millones al año, más que la utilidad operativa actual de la compañía, frente a una inversión estimada de 5.200 millones: casi siete veces lo invertido.'
  },
  {
    id: 17,
    sectionTag: 'a. Decisión',
    shortTitle: 'Decisión de la junta',
    title: 'Lo que le pedimos hoy a la junta',
    durationSeconds: 35,
    durationLabel: '35 s',
    speakerKeyHighlight: 'Aprobar programa de 12 meses (≈ 5.200 M), aplazar cierres/recortes hasta el mes 6 y aprobar política ética.',
    speakerNotes:
      'Señores miembros de la junta, el camino de recortar tiendas y beneficios achica la empresa sin resolver la raíz del problema. Hoy les pedimos tres decisiones concretas: primero, aprobar este programa de 12 meses, con una inversión estimada de 5.200 millones, y el inicio inmediato de la fase de datos; segundo, aplazar el cierre de las 9 tiendas y el recorte de Pradera Plus hasta evaluar juntos los resultados reales en el mes 6; y tercero, aprobar nuestra política de uso ético de datos, donde ningún algoritmo decide solo sobre un cliente.'
  },
  {
    id: 18,
    sectionTag: null,
    shortTitle: 'Preguntas',
    title: 'Gracias · ¿Preguntas?',
    durationSeconds: 0,
    durationLabel: '5 min preguntas',
    speakerKeyHighlight: 'Bloque de 5 minutos de preguntas de la Junta Directiva (exposición completada en 15:00 exactos).',
    speakerNotes:
      'Muchas gracias por su atención. Hemos completado nuestra exposición en los 15 minutos establecidos y abrimos ahora los 5 minutos de preguntas sobre el retorno financiero, el cronograma o los candados éticos del programa.'
  }
];

export const SLIDES_DATA: SlideMeta[] = rawSlides.reduce<SlideMeta[]>((acc, slide, index) => {
  const prevCumulative = index === 0 ? 0 : acc[index - 1].cumulativeSeconds;
  const cumulativeSeconds = prevCumulative + slide.durationSeconds;
  acc.push({
    ...slide,
    cumulativeSeconds,
    cumulativeLabel: formatSecondsToMMSS(cumulativeSeconds)
  });
  return acc;
}, []);
