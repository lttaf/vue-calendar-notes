<template>
  <div class="card text-white bg-secondary mb-3" style="max-width: 30rem">
    <div class="card-body">
      <div class="form-group">
        <h4>Add a new calendar</h4>
        <input
          v-model="calendarName"
          type="text"
          class="form-control"
          placeholder="Calendar name"
          id="inputDefault"
        />
      </div>
      <label
        for="exampleSelect1"
        class="form-label"
        style="margin-top: 5%; margin-left: 5%"
        ><strong>Invite friends</strong></label
      >
      <div class="input-group">
        <input
          v-model="friendName"
          type="text"
          class="form-control"
          placeholder="Friend's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          data-com.bitwarden.browser.user-edited="yes"
        />
        <button @click.prevent="addFriend" class="btn btn-primary" type="button" id="button-addon2">
          Add
        </button>
      </div>
      <button
        v-for="friend of friends"
        :key="friend.id"
        type="button"
        class="btn btn-sm btn-link"
        style="text-decoration: none; outline: none; margin-top: 3%"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Delete"
        @click="deleteFriend(friend.id)"
      >
        {{ friend.name }}
      </button>
      <div class="d-grid gap-2">
        <button
          @click="saveCalendar"
          class="btn btn-lg btn-secondary"
          type="button"
          style="margin-top: 12%"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendarName: "",
      friendName: "",
      friends: [],
    };
  },
  computed: {
    members() {
      const authId = this.$store.state.authId
      const members = { [authId]: authId }
      this.friends.forEach((f) => members[f.id] = f.id)
      return members
    }
  },
  methods: {
    friendIndex(id) {
      return this.friends.findIndex((i) => i.id === id);
    },
    saveCalendar() {
      const newCalendar = {
        name: this.calendarName,
        memberIds: this.members,
      };
      this.$store.dispatch("createCalendar", newCalendar)
      this.calendarName = ""
      this.friends = []
    },
    addFriend() {
      const name = this.friendName;
      this.friendName = '';
      if (name.trim().length === 0) return;
      const user = this.$store.getters.userByName(name)
      if (user == null) return; // 'user == null' covers undefined (which it will be if no user is found)
      this.friends.push({ name: user.name, id: user['.key'] })
    },
    deleteFriend(id) {
      const friendIndex = this.friendIndex(id);
      this.friends.splice(friendIndex, 1);
    }
  },
};
</script>

<style scoped>
</style>