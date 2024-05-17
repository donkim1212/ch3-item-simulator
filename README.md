# 개인 과제) 아이템 시뮬레이터

### [사이트 링크](http://ec2-3-34-134-110.ap-northeast-2.compute.amazonaws.com:3000/)
## 개요

- Node.js, Express.js와 MongoDB를 사용하여 게임 아이템 시뮬레이션에 필요한 서버의 API 기능들을 구현합니다. 캐릭터의 생성과 조회, 아이템의 생성, 조회와 업데이트, 캐릭터에 아이템들을 장착/탈착하고 그에 맞게 스테이터스가 수정되는 API 기능이 구현되어 있습니다.

과제 spec:[링크](https://teamsparta.notion.site/Node-js-c97fbe7a14194cd592b71a0019c4b4ad)

## Wireframe
![wireframe](https://github.com/donkim1212/ch3-item-simulator/assets/32076275/ce2e1083-8071-4ca4-81c6-f5480cd8b593)

## API 명세서

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
      -
    </td>
    <td>
      { "message": "Successfully retrieved character data.",<br>"data": { "name":"유저이름1", "health":500, "power":100 } }
    </td>
  </tr>
  <tr>
    <td>캐릭터 삭제</td><td>/api/characters/:character_id</td><td>DELETE</td>
    <td>
      -
    </td>
    <td>
      { "message": "Successfully deleted user 1" }
    </td>
  </tr>
</table>

### Equipments
<table>
  <tr>
    <td>Feature</td><td>API URL</td><td>Method</td><td>request</td><td>response</td>
  </tr>
  <tr>
    <td>장비 조회</td><td>/api/equipments/:character_id</td><td>GET</td>
    <td>
      -
    </td>
    <td>
      { "message": "Retrieving equipment data for character_id: 1",<br>
      "data": [<br>
      {"item_code":1, "item_name":"서리왕의 검"},<br>
      {"item_code":2, "item_name":"나무 방패"}<br>
      ]}
    </td>
  </tr>
  <tr>
    <td>장비 장착</td><td>/api/equipments/:character_id</td><td>PUT</td>
    <td>
      # "equip" is boolean<br>
      { "item_code": 3, "equip": true }
    </td>
    <td>
      # "equip" = true<br>
      { "message": "Equipped the item '가죽 장화'." }<br>
      # "equip" = false<br>
      { "message": "Unquipped the item '가죽 장화'." }
    </td>
  </tr>
</table>

### Items
<table>
  <tr>
    <td>Feature</td><td>API URL</td><td>Method</td><td>request</td><td>response</td>
  </tr>
  <tr>
    <td>아이템 생성</td><td>/api/items</td><td>POST</td>
    <td>
      {"item_code": 4,<br>
      "item_name":"은 반지"<br>
      "item_stat": {<br>
        "health": 30,<br>
        "power": 5<br>
      }}
    </td>
    <td>
      { "character_id": 1 }
    </td>
  </tr>
  <tr>
    <td>아이템 조회</td><td>/api/items/:item_code</td><td>GET</td>
    <td>
      -
    </td>
    <td>
      # n is the item_code
      { "message": "Successfully found item with item_code: n",<br>
      "item_code": 4,<br>
      "item_name":"은 반지"<br>
      "item_stat": {<br>
        "health": 30,<br>
        "power": 5<br>
      }}
    </td>
  </tr>
  <tr>
    <td>아이템 전체 조회</td><td>/api/items/</td><td>GET</td>
    <td>
      -
    </td>
    <td>
      [<br>
      { "item_code": 1, "item_name":"서리왕의 검" },<br>
      { "item_code": 2, "item_name":"나무 방패" },<br>
      { "item_code": 2, "item_name":"가죽 장화" },<br> ...
      <br>]
    </td>
  </tr>
  <tr>
    <td>아이템 수정</td><td>/api/items/:item_code</td><td>PUT</td>
    <td>
      {<br>
      	"item_name":"동 반지",<br>
      	"item_stat": {<br>
      		"health": 12,<br>
      		"power": 2<br>
      	}<br>
      }
    </td>
    <td>
      { "message": "Successfully updated the item with code: 4" }
    </td>
  </tr>
</table>
