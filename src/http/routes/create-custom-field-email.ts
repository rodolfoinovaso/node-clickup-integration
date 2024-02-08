import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function createCustomFieldEmail(app: FastifyInstance) {
  app.post("/create-custom-field-email", async (request, replay) => {

    const requestBody = z.object({
      taskId: z.string(),
      fieldId: z.string(),
      leadEmail: z.string()
    })

    const { taskId, fieldId, leadEmail } = requestBody.parse(request.body)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123'
      }).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/field/${fieldId}?${query}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({
            value: leadEmail
          })
        }
      );
      
      const data = await resp.json();
      return replay.status(201).send({ message: "Email adicionado com sucesso!", data })
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}