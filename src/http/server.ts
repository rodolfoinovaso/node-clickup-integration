import fastify from "fastify";
import cors from '@fastify/cors';

import { getUserAuth } from "./routes/get-userAuth";
import { getTeamAuth } from "./routes/get-teamAuth";
import { getSpaces } from "./routes/get-spaces";
import { createSpace } from "./routes/create-space";
import { getSpaceById } from "./routes/get-space-by-id";
import { getFoldersBySpace } from "./routes/get-folders-by-space";
import { createFolder } from "./routes/create-folder";
import { getFolderById } from "./routes/get-folder-by-id";
import { getListsByFolder } from "./routes/get-lists-by-folder";
import { createListOnFolder } from "./routes/create-list-on-folder";
import { createFolderlessList } from "./routes/create-folderless-list";
import { getTasksByList } from "./routes/get-taks-by-list";
import { getTaskById } from "./routes/get-task-by-id";
import { createTaskOnList } from "./routes/create-task-on-list";
import { getCustomFieldsByList } from "./routes/get-custom-fields-by-list";
import { createCustomFieldEmail } from "./routes/create-custom-field-email";
import { createCustomFieldInvestiment } from "./routes/create-custom-field-investment";
import { updateTask } from "./routes/update-task";
import { createTagOnTask } from "./routes/create-tag-on-task";

const app = fastify();

const nodeServerPort = Number(process.env.PORT);

app.register(getUserAuth)
app.register(getTeamAuth)
app.register(getSpaces)
app.register(createSpace)
app.register(getSpaceById)
app.register(getFoldersBySpace)
app.register(createFolder)
app.register(getFolderById)
app.register(getListsByFolder)
app.register(createListOnFolder)
app.register(createFolderlessList)
app.register(getTasksByList)
app.register(getTaskById)
app.register(createTaskOnList)
app.register(getCustomFieldsByList)
app.register(createCustomFieldEmail)
app.register(createCustomFieldInvestiment)
app.register(updateTask)
app.register(createTagOnTask)

app.listen({ port: nodeServerPort }).then(() => {
  console.log(`✔️  HTTP Server Running on port ${nodeServerPort}!`);
});
