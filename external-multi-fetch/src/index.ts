import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { baseURL, itemNames, headersFetch } from './utilidades.js';

const app = new Hono()

// Endpoint para obtener los datos
app.get('/', async (c) => {
  try {
    // Construir las URLs dinámicamente usando la URL base y las claves de itemNames
    const urls = Object.keys(itemNames).map(id => `${baseURL}${id}`);
    
    // Realizar todas las solicitudes HTTP en paralelo
    const responses = await Promise.all(urls.map(url => fetch(url, { method: 'GET', headers: headersFetch })));
    const dataResponses = await Promise.all(responses.map(res => res.json()));

    const results = dataResponses.map((data, index) => {
      const itemId = Object.keys(itemNames)[index];
      const itemName = itemNames[itemId] || 'Artículo desconocido';

      if (data.success === 1) {
        // Extraer el precio en centavos y convertirlo a dólares
        const precio = parseInt(data.precio, 10) / 100;

        // Usar regex para extraer la cantidad disponible en "productos"
        // Extraer información del resumen de órdenes de venta
        const sellOrderSummary = data.productos;
        // Usar expresiones regulares para extraer precio y cantidad
        const quantityMatch = sellOrderSummary.match(/<span class="productos">(\d+)<\/span>/);
        
        const sellQuantity = quantityMatch ? quantityMatch[1] : '0';

        return {
          id: itemId,
          price: `$${precio.toFixed(2)}`, // Precio formateado a dos decimales
          quantity: sellQuantity
        };
      } else {
        return { name: itemName, error: 'Error al obtener los datos de Steam' };
      }
    });

    return c.json(results);
  } catch (error) {
    return c.json({ error: 'Error al realizar las solicitudes' }, 500);
  }
});

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
