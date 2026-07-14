# Actividad Grupal - App de Gaming

## Consigna

Diseñar una plataforma para un nicho específico. Deben presentar la interfaz realizada con IA generativa y explicar en un slide los puntos detallados abajo.

---

## Nombre de la App

**PartyFinder**

## Transacción Central (El Verbo)

**Conectar** — La app conecta jugadores que tienen un grupo incompleto con jugadores disponibles que buscan unirse a una partida. El jugador que necesita completar su grupo publica una solicitud, y los jugadores disponibles pueden postularse para llenar ese lugar.

## Plan de Captación

Para que la app no esté vacía al inicio, subsidiar a los **jugadores solos (free agents)**:
- Ofrecer recompensas in-app (puntos de reputación, badges) a los primeros jugadores que se registren como "disponibles"
- Integración con Discord para importar comunidades de gaming ya existentes
- Partnership con streamers pequeños/medianos que necesitan completar lobbies frecuentemente
- Los grupos que publican solicitudes llegan orgánicamente porque tienen la necesidad inmediata

## Criterio de Matchmaking

El dato más importante para unir a dos personas es el **rango/nivel competitivo**:
- **Rango** (Ej: Gold, Platinum, Diamond en LoL/Valorant) — nadie quiere jugar con alguien 3 rangos abajo o arriba
- **Rol/Posición** — si el equipo necesita un support, matchear con jugadores que juegan support
- **Idioma** — comunicación es clave en juegos competitivos
- **Servidor/Región** — para asegurar buen ping y latencia

## Herramientas para los Usuarios

- **Sistema de búsqueda rápida**: publicar que necesitás un jugador con filtros (juego, rango, rol, idioma)
- **Perfil de jugador**: stats importadas de la API del juego (rango, winrate, roles principales)
- **Chat en tiempo real**: para coordinar antes de entrar a la partida
- **Sistema de reputación**: calificar al jugador después de la partida (puntualidad, actitud, skill)
- **Historial de partidas compartidas**: ver con quién jugaste y repetir si fue buena experiencia
- **Lista de favoritos**: guardar jugadores confiables para invitar en el futuro

## Manual de Convivencia (Gobernanza)

### 3 Reglas de Oro (baneo inmediato si se rompen):

1. **No toxicidad ni acoso**: Insultos, discriminación, o cualquier forma de acoso hacia otros jugadores resulta en baneo permanente. La plataforma es para pasarla bien.
2. **No ghosting de partidas**: Si aceptás unirte a un grupo y no te presentás (sin avisar), se considera falta grave. La confiabilidad es el core de la app.
3. **No smurfeo ni falsificación de rango**: Mentir sobre tu rango real o usar cuentas secundarias para aparentar otro nivel rompe el matchmaking y arruina la experiencia para todos.
