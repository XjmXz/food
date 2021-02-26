
const reducer = function (state: any, action: any) {
    switch (action.type) {
        case "POSTCOMMENT":
            state.map((item: any) => {
                if (item.id == action.info.id) {
                    item.comments.push(action.info.data)
                    return item;
                }
                return item;
            })
            //reduer中修改数据之后一定要返回一个全新的数据
            return [...state];
            break;
    }
};

export default reducer;