import { FastifyInstance } from "fastify";

export async function getTeamAuth(app: FastifyInstance) {
  app.get("/team", async (request, replay) => {
    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(`https://api.clickup.com/api/v2/team`, {
      method: "GET",
      headers: {
        Authorization: clickUpAPIKEY ? clickUpAPIKEY : "",
      },
    });

    const data = await resp.text();
    return replay.status(200).send(data);
    } catch (error) {
      return replay.status(500).send(error);
    }
  })
}