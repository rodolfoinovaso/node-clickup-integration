import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function getSpaceById(app: FastifyInstance) {
  app.get("/space/:spaceId", async (request, replay) => {
    const requestQuery = z.object({
      spaceId: z.string()
    })

    const { spaceId } = requestQuery.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/space/${spaceId}`,
        {
          method: 'GET',
          headers: {
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          }
        }
      );
      
      const data = await resp.text();
      return replay.status(200).send(data)
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}