---
title: "Configure Amazon Cognito"
date: 2024-01-01
weight: 3
chapter: false
pre: " <b> 5.2.2 </b> "
---

In this section, you will create an **Amazon Cognito User Pool** for the application. After the User Pool is created, you will retrieve the required values (**User Pool ID**, **Client ID**, and **Client Secret**) for configuring the backend application.

---

## Step 1 - Create a User Pool

1. Open the **Amazon Cognito** console.
2. Select **Create user pool**.
3. Choose **Traditional web application**.
4. Enter an application name.

> In this workshop, the application uses **Amazon Cognito User Pools** to authenticate users.

![Create User Pool](/images/5-Workshop/5.2-Prerequisite/cognito1.png)

---

## Step 2 - Configure Sign-in Options

Configure the authentication settings.

1. Select **Email** as the sign-in identifier.
2. Enable **Self-registration**.
3. Configure **Email** as the required user attribute.

> These settings allow users to register and sign in using their email address.

![Configure Authentication](/images/5-Workshop/5.2-Prerequisite/cognito2.png)

---

## Step 3 - Configure the Callback URL

Enter the callback URL used by the frontend application.

1. Specify the application's callback URL.
2. Verify the configuration.
3. Click **Create user directory**.

> The callback URL is used after successful authentication to redirect users back to the application.

![Callback URL](/images/5-Workshop/5.2-Prerequisite/cognito3.png)

---

## Step 4 - Verify the User Pool

After a few moments, Amazon Cognito creates the new User Pool.

Verify that the newly created User Pool appears in the **User pools** list.

![User Pool Created](/images/5-Workshop/5.2-Prerequisite/cognito4.png)

---

## Step 5 - Retrieve the User Pool ID

Open the created User Pool.

From the **Overview** page, copy the **User Pool ID**.

This value will be required when configuring the backend application.

![User Pool ID](/images/5-Workshop/5.2-Prerequisite/cognito5.png)

---

## Step 6 - Retrieve the Client ID and Client Secret

Navigate to:

**Applications → App clients**

Open the application client that was created previously.

Copy the following values:

- **Client ID**
- **Client Secret**

These values are required when the backend communicates with Amazon Cognito.

![App Client Information](/images/5-Workshop/5.2-Prerequisite/cognito6.png)

---

## Result

Congratulations!

You have successfully created an **Amazon Cognito User Pool**.

The following values are now available for configuring your backend application:

- User Pool ID
- Client ID
- Client Secret

These values will be used in the next section to integrate authentication into the application.
