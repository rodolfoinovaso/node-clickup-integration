import { FastifyInstance } from "fastify";
import { z } from "zod"
import { pickUpBusinessDays } from "../../utils/pickUpBusinessDays";

export async function createTaskOnList(app: FastifyInstance) {
  app.post("/create-task", async (request, replay) => {

    const requestBody = z.object({
      listId: z.string(),
      solutionType: z.string(),
      taskName: z.string(),
      leadEmail: z.string(),
      projectType: z.string()
    })

    const { listId, taskName, solutionType, leadEmail, projectType } = requestBody.parse(request.body)

    let solutionTypeById = ""
    let projectTypeById = ""

    switch (solutionType) {
      case "initial": {
        solutionTypeById = "9d4cb65d-cd35-4f63-8667-2d81fbe9a59a"
        break;
      }
      case "intermediary": {
        solutionTypeById = "6ddae358-b5ac-4f87-844d-dcbcfdd284f6"
        break;
      }
      case "advanced": {
        solutionTypeById = "e2ecbfa5-548a-4c37-a0df-c85ff312e918"
        break;
      }
      case "web": {
        solutionTypeById = "9c9855b0-e194-4a30-b094-ab1f810413ab"
        break;
      }
      case "paidTraffic": {
        solutionTypeById = "cee7f5e5-299b-4d04-853d-a9bfc3082442"
        break;
      }
      case "emailMarketing": {
        solutionTypeById = "50af5faf-fd59-4c86-8aad-e60de6a73d5f"
        break;
      }
      case "automation": {
        solutionTypeById = "f1b2f218-4a2e-4de7-81eb-f9e71c20d508"
        break;
      }
      case "socialMedia": {
        solutionTypeById = "88069cac-829b-4e46-84aa-7e70c3015c4c"
        break;
      }
      case "null": {
        solutionTypeById = "995ec8d9-2574-400b-af7a-cf557f5e60c7"
        break;
      }
      default: {
        solutionTypeById = "995ec8d9-2574-400b-af7a-cf557f5e60c7"
      }
    }

    switch (projectType) {
      case "plan": {
        projectTypeById = "0c6d84f0-8309-4eff-bac2-d453bb425205"
        break;
      }
      case "landingPage": {
        projectTypeById = "b3645bd4-48d4-47a5-8033-23791f0ee022"
        break;
      }
      case "institutionalWebsite": {
        projectTypeById = "a01d79c8-ebcb-4d16-83bd-62b7db0c489f"
        break;
      }
      case "blog": {
        projectTypeById = "f21753a4-22d5-4450-b5ca-f365ee90c593"
        break;
      }
      case "e-commerce": {
        projectTypeById = "f606737e-b6ab-4cb8-b6a3-d3d3738763b3"
        break;
      }
      case "trafficPerpectual": {
        projectTypeById = "385570e8-eb13-4b2e-84d7-318943410aa9"
        break;
      }
      case "trafficCampain": {
        projectTypeById = "72553b4e-ed7c-49ce-8801-8a7636e0a8cb"
        break;
      }
      case "trafficPerpectualAndCampain": {
        projectTypeById = "dda7fa42-2d80-48c4-abfe-a8a7e697da16"
        break;
      }
      case "emailPerpectual": {
        projectTypeById = "9248d4e2-7363-4082-996c-23f72bcf473a"
        break;
      }
      case "emailCampain": {
        projectTypeById = "ca0cc876-60c4-43e9-8b19-1918ba7792af"
        break;
      }
      case "emailPerpectualAndCampain": {
        projectTypeById = "9ffffdcd-4590-4550-a119-d2f274626e28"
        break;
      }
      case "automationChat": {
        projectTypeById = "13b44073-440f-4e79-8e08-e60750e25c87"
        break;
      }
      case "automationContent": {
        projectTypeById = "9fb4159c-86e0-4454-a660-fef49060788c"
        break;
      }
      case "automationChatAndContent": {
        projectTypeById = "2b10a20e-5910-4cd2-afa8-3b62ec367d5e"
        break;
      }
      case "socialManagement": {
        projectTypeById = "6a7e1223-3760-4239-aa92-9383972b2629"
        break;
      }
      case "socialManagementAndContent": {
        projectTypeById = "92dcebf4-9a4b-4e84-96fd-2022e1b78b76"
        break;
      }
      case "null": {
        projectTypeById = "0e5e5763-707b-4e25-9119-037d9151a4a9"
        break;
      }
      default: {
        projectTypeById = "0e5e5763-707b-4e25-9119-037d9151a4a9"
      }
    }

    const addTagWhenTheLeadComesFromGeneralChat = solutionType && solutionType !== "null" ? "" : "chat geral"

    const toDay = new Date().getTime()
    const dueDate = pickUpBusinessDays(3);

    try {
      const clickUpAPIKEY = process.env.CLICKUP_API_KEY

      const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '123'
      }).toString();

      const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: clickUpAPIKEY ? clickUpAPIKEY : ""
          },
          body: JSON.stringify({
            name: taskName,
            description: '',
            markdown_description: '',
            assignees: [183],
            tags: [addTagWhenTheLeadComesFromGeneralChat],
            status: 'LEAD INICIOU CONVERSA',
            priority: 3,
            due_date: dueDate,
            due_date_time: false,
            time_estimate: 8640000,
            start_date: toDay,
            start_date_time: false,
            notify_all: true,
            parent: null,
            links_to: null,
            check_required_custom_fields: true,
            custom_fields: [
              {
                id: "54c9935d-abd1-4f96-9d65-194934ffc808",
                value: leadEmail ? leadEmail : "",
              },
              {
                id: "d2b48a15-4ccd-45f5-99e2-3c04ae003223",
                value: projectTypeById ? projectTypeById : "",
              },
              {
                id: "e00e0f84-69a5-447a-b9b1-062d60eea2ba",
                value: solutionTypeById ? solutionTypeById : "",
              },
            ]
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