import { FastifyInstance } from "fastify";
import { z } from 'zod'

export async function createSpace(app: FastifyInstance) {
  app.post("/create-space", async (request, replay) => {
    const requestBody = z.object({
      teamId: z.string(),
      newSpaceName: z.string()
    })

    const { teamId, newSpaceName } = requestBody.parse(request.body)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/team/${teamId}/space`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({
            name: newSpaceName,
            multiple_assignees: true,
            features: {
              due_dates: {
                enabled: true,
                start_date: false,
                remap_due_dates: true,
                remap_closed_due_date: false
              },
              time_tracking: {enabled: false},
              tags: {enabled: true},
              time_estimates: {enabled: true},
              checklists: {enabled: true},
              custom_fields: {enabled: true},
              remap_dependencies: {enabled: true},
              dependency_warning: {enabled: true},
              portfolios: {enabled: true}
            }
          })
        }
      );
      
      const data = await resp.json();
      return replay.status(201).send(data)

    } catch (error) {
      return replay.status(500).send(error)
    }
  })
}