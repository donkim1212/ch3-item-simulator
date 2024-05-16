# 개인 과제) 아이템 시뮬레이터

## [사이트 링크](https://donkim1212.github.io/nbc_ch2_tmdb/)

## 개요

- Node.js, Express.js와 MongoDB를 사용하여 게임 아이템 시뮬레이션 기능을 구현합니다. 캐릭터의 생성과 조회, 아이템의 생성, 조회와 업데이트, 캐릭터에 아이템들을 장착/탈착하고 그에 맞게 스테이터스가 수정되는 기능이 구현되어 있습니다.

과제 spec:[링크](https://teamsparta.notion.site/Node-js-c97fbe7a14194cd592b71a0019c4b4ad)

## API 명세서 (작성중)

### API 목록
<table>
  <tr>
    <td>characters</td><td>equipments</td><td>items</td>
  </tr>
</table>

### characters
<table>
  <tr>
    <td>Feature</td><td>API URL</td><td>Method</td><td>request</td><td>response</td>
  </tr>
  <tr>
    <td>캐릭터 생성</td><td>/api/characters</td><td>POST</td>
    <td>
      { "name":"유저이름1" }
    </td>
    <td>
      { "character_id": 1 }
    </td>
  </tr>
  <tr>
    <td>캐릭터 조회</td><td>/api/characters/:character_id</td><td>GET</td>
    <td>
      {}
    </td>
    <td>
      { "message": "Successfully retrieved character data.",<br>"data": { "name":"유저이름1", "health":500, "power":100 } }
    </td>
  </tr>
  <tr>
    <td>캐릭터 삭제</td><td>/api/characters/:character_id</td><td>DELETE</td>
    <td>
      {}
    </td>
    <td>
      { "message": "Successfully deleted user 1" }
    </td>
  </tr>
</table>
