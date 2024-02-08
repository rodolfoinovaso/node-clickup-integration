import { FastifyInstance } from "fastify";

export async function getSpaces(app: FastifyInstance) {
  app.get("/spaces", async (request, replay) => {
    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({archived: 'false'}).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/team/9010152789/space?${query}`,
        {
          method: "GET",
          headers: {
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : "",
          },
        }
      );
    
      const data = await resp.text();
      return replay.status(200).send(data);
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}