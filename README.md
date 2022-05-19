<h1>Challenge Telecom - Weather API (backend)</h1>

<p>Este proyecto es una API que sirve para consultar el clima de una ciudad o de la posición actual en la que se encuentra el usuario y el pronóstico para los próximos 3 días. Además cuenta con un endpoint para obtener la posición actual del usuario</p>
<br>
<h3>Las tecnologías utilizadas</h3>
<ul>
    <li>Node JS</li>
    <li>Typescript</li>
    <li>Jest</li>
    <li>Supertest</li>
    <li>Should</li>
    <li>Inversify</li>
</ul>

<br>

<p>Esta API se conecta con el servicio de WEATHER API para obtener la información del clima (Se implementó pero no se usó OpenWeather ya que no tenía servicio gratuito para obtener el pronóstico de dias posteriores). Se utilizó el servicio de IP-API para obtener la localización del usuario mediante su IP</p>
<hr>
<h3>Instalación</h3>
<ul>
    <li>Clonar el proyecto</li>
    <li>Correr el comando "npm install" para instalar las dependencias</li>
    <li>Levantar el servidor con el comando "npm start"</li>
    <li>Comando "npm run test" para correr tests (no tener el servidor corriendo)</li>
</ul>

<h3>Endpoints</h3>
<ul>
    <li><strong>/v1/location</strong> => Devuelve la ubicación actual basado en la IP</li>
    <li><strong>/v1/current/[city?] => Devuelve el pronostico del clima actual basado en la ciudad (city: parámetro opcional) o en la IP</strong></li>
    <li><strong>/v1/forecast/[city?] => Devuelve el pronostico del clima para los próximos 3 días basado en la ciudad (city: parámetro opcional) o en la IP</strong></li>
</ul>
<br>
<hr>
<p><strong>Federico Garcia</strong></p>