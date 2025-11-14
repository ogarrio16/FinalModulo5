import _ from 'lodash';
import './styles.scss';
import yaml from './datos.yaml';
import json5 from './datos.json5';
import tabla from './datos.csv';
import imagen from './image.png';

import { Chart } from 'chart.js/auto';

// Registrar Service Worker (simple)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('SW ok'))
      .catch(err => console.log('SW error', err));
  });
}

function app() {
  const cont = document.getElementById('app');

  const card = document.createElement('div');
  card.className = 'card';

  const titulo = document.createElement('h2');
  titulo.textContent = _.join(['Hola', 'Webpack'], ' ');
  card.appendChild(titulo);

  const p = document.createElement('p');
  p.textContent = `YAML: ${yaml.nombre} v${yaml.version} | JSON5 autor: ${json5.author}`;
  card.appendChild(p);

  const img = document.createElement('img');
  img.src = imagen;
  img.alt = 'Imagen local';
  card.appendChild(img);

  const pre = document.createElement('pre');
  pre.textContent = `CSV:\n${JSON.stringify(tabla, null, 2)}`;
  card.appendChild(pre);

  cont.appendChild(card);

  // Mini gráfico (para cumplir “lib externa” sin complicar)
  const canvas = document.getElementById('miniChart');
  if (canvas) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: tabla.map(r => r.label),
        datasets: [{
          label: 'Valores',
          data: tabla.map(r => Number(r.valor))
        }]
      },
      options: { responsive: false }
    });
  }
}

app();
