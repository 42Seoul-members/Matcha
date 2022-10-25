# Feature

### 1. Registration, Signing-in, Profile

---

- user should have

  - email (which should verified at register)
  - username (for login, must have unique name)
  - last name
  - first name
  - password
  - public fame rating (amount of likes)

- user should set at first login

  - gender (he, she, other)
  - sexual preference
  - biography
  - list of interests with reusable tage (ex. #vegan, #geek, #piercing...)
  - picures (max 5, including 1 as profile)
  - age

- user should be able to

  - login with username, password
  - recive mail to reset password
  - logout
  - edit all infos
  - check who looked at user's profile, who liked user
  - modify user's GPS position
  - use Omniautth strategies (42, google)
  - import pictures from google

- user must be located using GPS, even if user doesn't want to.

---

### 2. Browsing

---

<em>user must be able to easily get a list of suggestions that match...</em>

- sexual preference
- geographic area
- tags
- fame rating
- sortable and filterable by age, location, fame rating, and tags
- should be implemented with map system

---

### 3. Research

---

<em>user must be able to run an advanced research by...</em>

- age gap
- fame rating gap
- location
- tags

---

### 4. Profile of other users

---

- every profile visiting must be added in user's visit history
- able to "like" user
  - users who have at least one picture and "like" each other, are able to chat
- check the fame rating
- check the user is online, or the date and time of the last login
- report user as a fake account
- block the user
  - blocked user won't appear anymore in the research results and won't generate additional notifications
- every info and feature must be see clearly

---

### 5. Chat

---

- user can DM to connected user in real time (10s delay)
- user must be able to see from any page if a new message is received

---

### 6. Notifications

---

<em>user must be notified in real time in any page when...</em>

- the user received like
- user's profile has been checked
- user received a message
- a "liked" user "liked" back
- a connected user "unliked" user
