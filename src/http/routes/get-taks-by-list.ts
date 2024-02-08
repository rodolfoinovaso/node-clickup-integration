import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function getTasksByList(app: FastifyInstance) {
  app.get("/tasks/:listId", async (request, replay) => {
    const requestParams = z.object({
      listId: z.string()
    })

    const { listId } = requestParams.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task`,
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