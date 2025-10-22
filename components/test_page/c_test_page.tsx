export function Testpage(){
  return(
    <div>
        <h4>글작성</h4>
          <form action="api/post" method="POST">
            <input name="title" placeholder="글제목"/>
            <input name="content" placeholder="글내용"/>
            <button type="submit">버튼</button>
          </form>
    </div>



  )
}