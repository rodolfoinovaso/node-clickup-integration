import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function createCustomFieldInvestiment(app: FastifyInstance) {
  app.post("/create-custom-field-investiment/:taskId", async (request, replay) => {
    const requestParams = z.object({
      taskId: z.string()
    })

    const requestBody = z.object({
      fieldId: z.string(),
      investiment: z.number()
    })

    const { taskId } = requestParams.parse(request.params)
    const { fieldId, investiment } = requestBody.parse(request.body)

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
            value: investiment
          })
        }
      );
      
      const data = await resp.json();
      return replay.status(201).send({ message: "Valor do projeto adicionado com sucesso!", data })
      
    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}