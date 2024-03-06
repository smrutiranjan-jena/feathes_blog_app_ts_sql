import { HookContext } from "../../../app";
import { PostTableDbOperations } from "../../post/utils/postTableDbOperation";
import { LikeTable_GET, Like_Status } from "../interfaces/likeInterfaces";
import { LikeTableDbOperations } from "../utils/likeTableDbOperation";

const onPostLiked = async (result: LikeTable_GET, context: HookContext) => {
    const likeCount = await LikeTableDbOperations.getDataWithPagination({
        dbQuery: {
            post: result.post,
            status: Like_Status.ACTIVE
        }
    }).then((res) => {
        return res.total
    })
    await PostTableDbOperations.modifyDatum({
        id: result.post,
        dbBody: {
            likeCount
        }
    })
}
export default onPostLiked;