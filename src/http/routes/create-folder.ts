import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function createFolder(app: FastifyInstance) {
  app.post("/create-folder", async (request, replay) => {
    const requestBody = z.object({
      spaceId: z.string(),
      folderName: z.string()
    })

    const { spaceId, folderName } = requestBody.parse(request.body)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/space/${spaceId}/folder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({name: folderName})
        }
      );
      
      const data = await resp.json();
      return replay.status(201).send(data)
      
    } catch (error) {
      replay.status(500).send(error)
    }
  })
}