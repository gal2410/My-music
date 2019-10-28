module.exports = {
    success:0,
    error:0,
    response_text:"",
    data:{},
    clearResponse:function(){
        this.data = {};
        this.success = 0;
        this.response_text = "";
        this.error = 0;
    }
}