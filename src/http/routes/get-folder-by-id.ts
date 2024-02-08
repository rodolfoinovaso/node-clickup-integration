import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function getFolderById(app: FastifyInstance) {
  app.get("/folder/:folderId", async (request, replay) => {
    const requestParams = z.object({
      folderId: z.string()
    })

    const { folderId } = requestParams.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/folder/${folderId}`,
        {
          method: 'GET',
          headers: {
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          }
        }
      );
      
      const data = await resp.text();
      replay.status(200).send(data)

    } catch (error) {
      replay.status(500).send(error)
    }
  })
}