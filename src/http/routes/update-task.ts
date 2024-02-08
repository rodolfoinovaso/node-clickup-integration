import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function updateTask(app: FastifyInstance) {
  app.put("/update-task/:taskId", async (request, replay) => {
    const requestParams = z.object({
      taskId: z.string()
    })

    const { taskId } = requestParams.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123'
      }).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({
            description: '',
            status: 'QUALIFICAÇÃO INICIAL',
            priority: 2,
          })
        }
      );
      
      const data = await resp.json();
      return replay.status(202).send(data)
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}