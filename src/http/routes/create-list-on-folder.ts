import { FastifyInstance } from "fastify";
import { z } from "zod"

export async function createListOnFolder(app: FastifyInstance) {
  app.post("/create-list/:folderId", async (request, replay) => {
    const requestParams = z.object({
      folderId: z.string(),
    })

    const requestBody = z.object({
      listName: z.string()
    })

    const { folderId } = requestParams.parse(request.params)
    const { listName } = requestBody.parse(request.body)

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const resp = await fetch(
        `https://api.clickup.com/api/v2/folder/${folderId}/list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({
            name: listName,
            content: 'New List Content',
            due_date: 1567780450202,
            due_date_time: false,
            priority: 1,
            assignee: 183,
            status: 'red'
          })
        }
      );
      
      const data = await resp.json();
      return replay.status(201).send(data)
      
    } catch (error) {
      replay.status(500).send(error)
    }
  })
}