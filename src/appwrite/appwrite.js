import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint("https://localhost/v1").setProject("6385b567bad85200f6cd");

const account = new Account(client);

const promise = account.createAnonymousSession();

promise.then(
  function (response) {
    console.log(response);
  },
  function (err) {
    console.log(err);
  }
);
