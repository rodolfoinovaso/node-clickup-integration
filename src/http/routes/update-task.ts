import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function updateTask(app: FastifyInstance) {
  app.put("/update-task", async (request, replay) => {

    const requestBody = z.object({
      taskId: z.string(),
      pageDescription: z.string(),
      occupationArea: z.string()
    })

    const { taskId, pageDescription, occupationArea } = requestBody.parse(request.body)

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
            description: `Área de atuação: ${occupationArea} \nDescrição de como quer a página: ${pageDescription}`,
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