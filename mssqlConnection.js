const { Knex } = require("knex");

const knexConfiguration = {
  client: "mssql",
  connection: {
    user: "dev01",
    password: "gen281315!",
    server: "localhost",
    database: "Consulting_TEST",
    port: 1433,
  },
};

const knex = require("knex")(knexConfiguration);

// Select("test");

function Select(table) {
  knex
    .select()
    .table(table)
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((err) => {
      console.log(err);
    });
}

function Insert(table, data) {
  // data 는 { column:value} 형식
  // 테이블을 가지고 있는 상태에서 받아온 data가 구조에 맞는지 확인 후 실행
  knex(table)
    .insert(data)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
}

// data = { Idx: 1, College: "테스트단과대학", OrderNum: 1 };
// Insert("test", data);

module.exports = {
  insertTable: function (table, data) {
    Insert(table, data);
  },
  SelectTable: function (table) {
    Select(table);
  },
};
