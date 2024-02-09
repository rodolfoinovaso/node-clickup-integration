import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function createTagOnTask(app: FastifyInstance) {
  app.post("/create-tag-on-task", async (request, replay) => {
    const requestBody = z.object({
      taskId: z.string(),
      tagName: z.string()
    })

    const { taskId, tagName } = requestBody.parse(request.body)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123'
      }).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/tag/${tagName}?${query}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          }
        }
      );
      
      const data = await resp.text();
      return replay.status(201).send({message: "Tag criada", content: data})
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}