import { HookContext } from "../../../app";
import { UserTableDbOperations } from "../../users/utils/userTableDbOperation";
import { PostTable_GET, Post_Status } from "../interfaces/postInterfaces";
import { PostTableDbOperations } from "../utils/postTableDbOperation";

const onPostCreated = async (result: PostTable_GET, context: HookContext) => {
    const { app } = context
    const { user } = result
    // console.log(result)
    // not needded direct service call using app
    const blogCount = await PostTableDbOperations.getDataWithPagination({
        dbQuery: {
            user,
            status: Post_Status.ACTIVE
        }
    }).then((res) => {
        return res.total
    })
    await UserTableDbOperations.modifyDatum({
        id: user,
        dbBody: {
            blogCount
        }
    })

}
export default onPostCreated;