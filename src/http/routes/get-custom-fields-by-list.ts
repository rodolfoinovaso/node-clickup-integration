import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function getCustomFieldsByList(app: FastifyInstance) {
  app.get("/custom-fields/:listId", async (request, replay) => {
    const requestParams = z.object({
      listId: z.string()
    })

    const { listId } = requestParams.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/field`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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