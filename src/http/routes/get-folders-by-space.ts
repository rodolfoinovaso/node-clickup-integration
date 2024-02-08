import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function getFoldersBySpace(app: FastifyInstance) {
  app.get("/folders-by-space/:spaceId", async (request, replay) => {
    const requestParms = z.object({
      spaceId: z.string()
    })

    const { spaceId } = requestParms.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY
      const query = new URLSearchParams({archived: 'false'}).toString()

      const resp = await fetch(
        `https://api.clickup.com/api/v2/space/${spaceId}/folder?${query}`,
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
      replay.status(500).send(error)
    }
  })
}