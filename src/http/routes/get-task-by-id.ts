import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function getTaskById(app: FastifyInstance) {
  app.get("/task/:taskId", async (request, replay) => {
    const requestParams = z.object({
      taskId: z.string()
    })

    const { taskId } = requestParams.parse(request.params)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123',
        include_subtasks: 'true',
        include_markdown_description: 'true'
      }).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
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