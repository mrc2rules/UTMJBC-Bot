# .github\dependabot.yml

```yml
# To get started with Dependabot version updates, you'll need to specify which
# package ecosystems to update and where the package manifests are located.
# Please see the documentation for all configuration options:
# https://docs.github.com/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file

version: 2
updates:
  - package-ecosystem: "npm" # See documentation for possible values
    directory: "/" # Location of package manifests
    schedule:
      interval: "weekly"

```

# .github\FUNDING.yml

```yml
# These are supported funding model platforms

github: lkaesberg
buy_me_a_coffee: sral12486
open_collective: # Replace with a single Open Collective username
ko_fi: # Replace with a single Ko-fi username
tidelift: # Replace with a single Tidelift platform-name/package-name e.g., npm/babel
community_bridge: # Replace with a single Community Bridge project-name e.g., cloud-foundry
liberapay: # Replace with a single Liberapay username
issuehunt: # Replace with a single IssueHunt username
otechie: # Replace with a single Otechie username
lfx_crowdfunding: # Replace with a single LFX Crowdfunding project-name e.g., cloud-foundry
custom: # Replace with up to 4 custom sponsorship URLs e.g., ['link1', 'link2']

```

# .github\ISSUE_TEMPLATE\custom.md

```md
---
name: Custom issue template
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---



```

# .github\ISSUE_TEMPLATE\new-language-template.md

```md
---
name: New Language Template
about: Create a new translation for the EmailBot
title: "[LANGUAGE]"
labels: enhancement
assignees: lkaesberg

---

English example translation. Please translate the text values to your language.

**Note:** Keep `%VAR%` placeholders as they are - these will be replaced with dynamic values.

\`\`\`json
{
  "_comment_user_messages": "=== MESSAGES SENT TO USER (DMs, verification flow) ===",
  
  "emailText": "Welcome to %VAR%!\n\nThis is a code that will give you access to the Discord server.\nPlease only send this code to EmailBot via Discord to gain access. Please do not give this code to anyone who asks for it other than EmailBot.\nHere is your access code: %VAR%",
  
  "_comment_public_text": "=== PUBLIC VISIBLE TEXT (embeds, buttons, modals) ===",
  
  "verifyEmbedTitle": "✉️ Email Verification",
  "verifyEmbedInstructions": "Click the button below to start the verification process. You will receive a code via email.\n\nAlready have a code? Use the **Enter Code** button.",
  "verifyEmbedFooter": "Verification System",
  "verifyDmDescription": "Welcome to **%VAR%**! Click the button below to verify your email address and gain access to the server.",
  "verifyDmButton": "Start Verification",
  "verifyDmAdminWarning": "Note: The server admin can see the email address you use",
  "buttonCreated": "✅ Verification button created successfully!",
  "enterCodeButton": "Enter Code",
  
  "emailModalTitle": "📧 Email Verification",
  "emailModalHeader": "## Verify Your Identity\nEnter your email address below to receive a verification code.",
  "emailModalLabel": "Email Address",
  "emailModalPlaceholder": "your.name@",
  "emailModalAdminWarning": "\n\n⚠️ **Note:** The server admin can see the email address you use.",
  "emailModalAllDomainsAccepted": "✅ Any email address is accepted",
  "emailModalAcceptedDomains": "📋 **You must use an email from one of these domains:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ e.g. `%VAR%`",
  
  "codeModalTitle": "🔐 Enter Verification Code",
  "codeModalHeader": "## Almost There!\nCheck your inbox for the 6-digit verification code.",
  "codeModalLabel": "Verification Code",
  "codeModalPlaceholder": "Enter 6-digit code",
  
  "codePromptTitle": "📬 Code Sent!",
  "codePromptDescription": "A verification code has been sent to:\n`%VAR%`\n\nClick the button below to enter your code.",
  "codePromptTip": "💡 Didn't receive it?",
  "codePromptTipValue": "Check your spam/junk folder. The email may take a few minutes to arrive.",
  
  "verificationSuccessTitle": "✅ Verification Complete!",
  "verificationSuccessDescription": "Welcome! You have been successfully verified.\n\n**Role assigned:** %VAR%\n**Server:** %VAR%\n\nYou now have full access to the server.",
  
  "_comment_errors": "=== ERROR MESSAGES (shown to users) ===",
  
  "mailInvalidTitle": "❌ Invalid Email",
  "mailInvalidDescription": "The email address you entered is not valid.\n\nPlease make sure:\n• The email has the correct format (name@domain.com)\n• You're using an allowed email domain\n• There are no spaces in the address",
  
  "invalidCodeTitle": "❌ Invalid Code",
  "invalidCodeDescription": "The code you entered is incorrect.\n\n**What to do:**\n• Double-check the 6-digit code from your email\n• Make sure you're using the most recent code\n• Request a new code if needed by clicking the verification button again",
  
  "mailFailedTitle": "❌ Email Delivery Failed",
  "mailFailedDescription": "We couldn't send the verification email to:\n`%VAR%`\n\n**Possible reasons:**\n• The email address doesn't exist\n• The email server rejected the message\n• There's a temporary delivery issue\n\nPlease double-check your email address and try again.",
  
  "mailTimeoutTitle": "⏳ Please Wait",
  "mailTimeoutDescription": "You're sending emails too quickly.\n\nPlease wait **%VAR% seconds** before requesting another verification code.\n\nThis limit helps prevent spam and ensures reliable email delivery.",
  
  "mailBlacklistedTitle": "🚫 Email Blocked",
  "mailBlacklistedDescription": "The email address you entered has been blocked by the server administrator.\n\nThis could be because:\n• The email domain is not allowed\n• The specific email has been banned\n\nIf you believe this is an error, please contact a server administrator.",
  
  "invalidPermissions": "You are not allowed to execute this command!",
  
  "errorGenericTitle": "❌ An Error Occurred",
  "errorGenericDescription": "Something went wrong while processing your request. The server administrator has been notified and will look into it.",
  
  "_comment_admin": "=== ADMIN NOTIFICATIONS (sent to server admins/owners) ===",
  
  "errorFieldGuild": "Server",
  "errorFieldUser": "User",
  "errorFallbackWarning": "⚠️ Notification Fallback",
  
  "errorNotifyChannelFailed": "The configured error channel no longer exists or the bot cannot send messages there. Error was sent to you (the owner) instead. Please reconfigure using `/set_error_notify`.",
  "errorNotifyUserFailed": "The configured error notification user is no longer in the server or has DMs disabled. Error was sent to you (the owner) instead. Please reconfigure using `/set_error_notify`.",
  
  "errorNotifySetOwner": "✅ Error notifications will now be sent to the server owner via DM.",
  "errorNotifySetChannel": "✅ Error notifications will now be sent to #%VAR%.",
  "errorNotifySetUser": "✅ Error notifications will now be sent to %VAR% via DM.",
  "errorNotifyInvalidChannel": "❌ Please select a text channel for error notifications.",
  "errorNotifyUserNotInGuild": "❌ The selected user is not a member of this server.",
  
  "errorNotifyStatusTitle": "📋 Error Notification Settings",
  "errorNotifyStatusOwner": "Error notifications are sent to the **server owner** (%VAR%) via DM.",
  "errorNotifyStatusChannel": "Error notifications are sent to **#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ Error notifications are configured for a channel that no longer exists. Notifications will fall back to the server owner.",
  "errorNotifyStatusUser": "Error notifications are sent to **%VAR%** via DM.",
  "errorNotifyStatusUserInvalid": "⚠️ Error notifications are configured for a user who is no longer in the server. Notifications will fall back to the server owner.",
  "errorNotifyStatusNote": "ℹ️ Note",
  "errorNotifyStatusNoteValue": "If the configured notification method fails, errors will automatically fall back to the server owner.",
  
  "errorRoleAssignTitle": "Role Assignment Error",
  "errorRoleAssignMessage": "Failed to assign the verified/unverified role to a user. Please ensure:\n• The bot's role is higher than the verified/unverified roles\n• The roles still exist\n• The bot has 'Manage Roles' permission",
  
  "errorBotNotConfiguredTitle": "Bot Not Configured",
  "errorBotNotConfiguredMessage": "A user tried to verify but the bot is not properly configured.\n\n**Required setup:**\n• Set allowed email domains with `/domains`\n• Set verified role with `/verifiedrole`\n\nRun `/status` to check the current configuration."
}
\`\`\`

```

# .github\workflows\ci.yml

```yml
name: CI + Deploy

on:
  push:
    branches:
      - main

concurrency:
  group: prod-and-pages
  cancel-in-progress: true

jobs:
  deploy-bot:
    name: Deploy bot (AlwaysData)
    runs-on: ubuntu-latest
    timeout-minutes: 15
    environment:
      name: production
      url: https://services-jbcemail.alwaysdata.net

    steps:
      - name: Checkout repository code
        uses: actions/checkout@v4

      - name: Deploy over SSH (AlwaysData-safe)
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PASSWORD }}
          command_timeout: 30m
          script: |
            set -euo pipefail

            APP_DIR="/home/jbcemail/EmailVerify"
            BOT_PAT="node /home/jbcemail/EmailVerify/src/EmailBot.js"
            SHARD_PAT="node /home/jbcemail/EmailVerify/src/sharder.js"

            cd "$APP_DIR"
            git fetch origin main
            git reset --hard origin/main
            npm ci --omit=dev

            nohup bash -lc "
              sleep 2
              pkill -TERM -f \"$BOT_PAT\" || true
              pkill -TERM -f \"$SHARD_PAT\" || true
            " >/dev/null 2>&1 < /dev/null &

            echo "Deploy finished. AlwaysData should restart services automatically."

  pages-build:
    name: Build Pages
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Install MkDocs
        run: pip install mkdocs-material

      - name: Build docs
        run: mkdocs build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site

  pages-deploy:
    name: Deploy Pages
    needs: pages-build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

# .gitignore

```
node_modules

config/config.json
.idea
config/bot.db
src/bot.db
config/ServerStats.json
config/ServerStatsHistory.log
discord-verify.txt
.env
src/.env
*.save
session.session
data/
2.js
3.js
4.js
a.py
reload.js
config/config.json
config/config.json

```

# CNAME

```
jbcbot.rahbab.com
```

# config\.gitkeep

```

```

# config\bot.db

```db

```

# COPYING

```
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.

```

# data\telegram_events.db

This is a binary file of the type: Binary

# docker-compose.yml

```yml
version: '3'
services:
  app:
    image: ghcr.io/lkaesberg/emailverify:latest
    ports:
      - 8181:8181
    volumes:
      - app_data:/usr/app/config
    restart: always

volumes:
  app_data:

```

# Dockerfile

```
FROM node:19

WORKDIR /usr/app/

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev  && rm -rf /var/lib/apt/lists/*

COPY . /usr/app/

RUN ls /usr/app/

RUN ls /usr/app/language

RUN npm install

CMD ["npm", "start"]

```

# docs\CNAME

```
jbcbot.rahbab.com

```

# docs\commands.md

```md
# Commands

## 👤 User Commands

These commands can be used by any user.

| Command | Description |
|---------|-------------|
| `/verify` | Start the email verification process to get access to the server |
| `/data delete-user` | Delete your personal verification data and remove your verified status |

---

## 🔧 Administrator Commands

The following commands require administrator permissions.

### 👥 Role Configuration

Configure which roles are assigned during the verification process.

#### Default Roles

Default roles are given to **all** verified users, regardless of their email domain.

| Command | Description |
|---------|-------------|
| `/role add <role>` | Add a role to the default roles list |
| `/role remove <role>` | Remove a role from the default roles list |
| `/role list` | View all configured default roles |
| `/role unverified [role]` | Set or view the optional role for unverified members (select current role to disable) |

#### Domain-Specific Roles

Assign different roles based on which email domain the user verifies with. Users receive their domain-specific roles **plus** any default roles.

| Command | Description |
|---------|-------------|
| `/domainrole add <domain> <role>` | Add a role for a specific email domain |
| `/domainrole remove <domain> <role>` | Remove a role from a specific domain |
| `/domainrole list` | View all domain-role mappings |
| `/domainrole clear <domain>` | Remove all roles for a specific domain |

#### Domain Role Examples

| Setup | Result |
|-------|--------|
| Default: `@Member`<br>Domain: `@*.edu` → `@Student` | User with `@stanford.edu` gets: `@Student`, `@Member` |
| Default: `@Verified`<br>Domain: `@company.com` → `@Employee`, `@Staff` | User with `@company.com` gets: `@Employee`, `@Staff`, `@Verified` |
| Domain: `@*.harvard.edu` → `@Harvard`<br>Domain: `@*.edu` → `@Student` | User with `@cs.harvard.edu` gets: `@Harvard`, `@Student` (all matching patterns) |

> 💡 **Tip:** When using `/domainrole add`, the domain field autocompletes with your configured domains from `/domain add`.

### 📧 Domain Management

Control which email domains are allowed for verification.

| Command | Description |
|---------|-------------|
| `/domain add <domains>` | Add allowed email domains (comma-separated for multiple) |
| `/domain remove <domains>` | Remove allowed domains |
| `/domain list` | View all currently allowed domains |
| `/domain clear` | Remove all allowed domains |

#### Wildcard Support

Use `*` as a wildcard to match any text:

| Pattern | Matches | Example |
|---------|---------|---------|
| `@gmail.com` | Only Gmail | `user@gmail.com` ✓ |
| `@*.edu` | Any .edu domain | `user@stanford.edu` ✓, `user@mit.edu` ✓ |
| `@*.harvard.edu` | Harvard subdomains | `user@cs.harvard.edu` ✓, `user@law.harvard.edu` ✓ |
| `@company.com` | Specific company | `user@company.com` ✓ |

### 🚫 Blacklist Management

Block specific email addresses or patterns from verifying. Supports `*` wildcard.

| Command | Description |
|---------|-------------|
| `/blacklist add <patterns>` | Add patterns to the blacklist (supports `*` wildcard) |
| `/blacklist remove <patterns>` | Remove patterns from the blacklist |
| `/blacklist list` | View all blacklisted entries |
| `/blacklist clear` | Remove all entries from the blacklist |

#### Blacklist Wildcard Examples

| Pattern | Blocks | Example Matches |
|---------|--------|-----------------|
| `spam@example.com` | Specific email | `spam@example.com` |
| `*@tempmail.*` | All tempmail domains | `user@tempmail.com`, `test@tempmail.net` |
| `*spam*` | Emails containing "spam" | `spam@gmail.com`, `myspammail@test.com` |
| `test*@*` | Emails starting with "test" | `test123@gmail.com`, `testuser@company.com` |

### ⚙️ Settings

Configure bot behavior and preferences.

| Command | Description |
|---------|-------------|
| `/settings language <language>` | Change the bot's display language |
| `/settings log-channel [channel]` | Set a channel for verification logs (leave empty to disable) |
| `/settings verify-message [message]` | Set a custom message for verification emails (leave empty for default) |
| `/settings auto-verify <enable>` | Automatically prompt new members to verify when they join |
| `/settings auto-unverified <enable>` | Automatically assign the unverified role to new members |

### 🛡️ Moderation & Setup

| Command | Description |
|---------|-------------|
| `/button <channel> <buttontext> [title] [message] [color]` | Create a verification button embed in a channel |
| `/manualverify <user> <email>` | Manually verify a user without email confirmation |
| `/set_error_notify owner` | Send error notifications to the server owner (default) |
| `/set_error_notify channel <channel>` | Send error notifications to a specific channel |
| `/set_error_notify user <user>` | Send error notifications to a specific user via DM |
| `/set_error_notify status` | View current error notification settings |

### 📊 Information

| Command | Description |
|---------|-------------|
| `/status` | View bot configuration, verification statistics, and check for setup issues |
| `/help` | Show setup instructions and command overview |

### ⚠️ Data Management (Danger Zone)

| Command | Description |
|---------|-------------|
| `/data delete-server` | Delete all server data and remove the bot from the server |

---

## ⚠️ Important Notes

### Role Hierarchy

The **EmailBot role must be higher** in the role hierarchy than both the verified and unverified roles. Otherwise, you'll see this error:

> `Can't find roles. Please contact the admin!`

![Role Hierarchy Example](https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/bothierarchy.png)

### Unverified Role Usage

The unverified role can be used to:
- Make a verification channel visible only to unverified users
- Restrict access to most channels until users verify
- Combined with `/settings auto-unverified`, automatically restrict new members

### Role Display in Verification

When domain-specific roles are configured, the verification modal shows users which roles they will receive:

\`\`\`
Accepted domains:
1. @*.edu → Student, Member
2. @company.com → Employee, Member
\`\`\`

This helps users understand what access they'll get before verifying.

---

### 📡 Telegram Scraper Configuration

Manage automated event scraping from campus Telegram channels into Discord threads.

| Command | Description |
|---------|-------------|
| `/scrape [action]` | Control the event scraper. `run` triggers an immediate manual scrape; `start` enables periodic background scraping (cron); `stop` halts the cron schedule |
| `/addchannel <channel_id>` | Add a Telegram channel (username or `-100...` numeric ID) to monitor for events |
| `/removechannel <channel_id>` | Stop monitoring a tracked Telegram channel |
| `/listchannels` | View all currently monitored Telegram channels |
| `/tgblacklist <action> [keyword]` | Add, remove, or list banned keywords. Messages containing blacklisted terms are silently ignored |


```

# docs\contributing.md

```md
# Contributors

#### Developer

- UTM Johor Bahru Community (mrc2rules)
- Lars Kaesberg (Original Upstream Creator)

#### Translation

- Lars Kaesberg (English, German)
- gus2131 (Spanish)
- kploskonka (Polish)
- Norma1Name (Hebrew)
- iplayagain (Korean)

To add more languages please create an issue or pull request. [Template](https://github.com/mrc2rules/UTMJBC-Bot/blob/main/language/english.json)

```

# docs\index.md

```md
<meta name="description" content="UTMJBC Bot - Email verification and AI event scraper for UTM Johor Bahru Community Discord server.">
<meta name="keywords" content="UTMJBC Bot Email Verify UTM Discord Event Scraper">
<meta name="author" content="UTM JBC">

# UTMJBC Bot

## Built With

<div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px; margin: 20px 0;">
<a href="https://discord.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/discord.png" alt="Discord" style="height: 56px; width: auto;" title="Discord"></a>
<a href="https://nodejs.org/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/node.png" alt="Node.js" style="height: 56px; width: auto;" title="Node.js"></a>
<a href="https://www.npmjs.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/npm.png" alt="npm" style="height: 40px; width: auto;" title="npm"></a>
<a href="https://discord.js.org/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/djs.png" alt="Discord.js" style="height: 56px; width: auto;" title="Discord.js"></a>
<a href="https://nodemailer.com/"><img src="https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/nodemailer.webp" alt="Nodemailer" style="height: 48px; width: auto;" title="Nodemailer"></a>
</div>

## Statistics

Server count: <strong id="serverCount">0</strong><br>
Users verified: <strong id="verifiedToday">0</strong> today / <strong id="verifiedAll">0</strong> all time<br>
Emails sent: <strong id="emailsToday">0</strong> today / <strong id="emailsAll">0</strong> all time

[View detailed statistics →](statistics.md)

## Description

UTMJBC Bot is a multi-purpose Discord bot tailored for the Universiti Teknologi Malaysia (UTM) community. It provides:
1. **Email Verification**: Verifies student and staff domain ownership (`@graduate.utm.my`, `@utm.my`) with automatic domain-specific role assignments.
2. **AI Event Scraper**: Automatically monitors campus Telegram channels, extracts structured event details using Gemini AI, normalises titles, filters out duplicates, and publishes rich event cards directly to Discord forum threads.

## Usage

### Join Discord

[Click here](https://discord.gg/vuGTVyFgck) to join the official UTM Johor Bahru Community Discord server.

### Need Help?

For bug reports or feature requests, visit our [GitHub Repository](https://github.com/mrc2rules/UTMJBC-Bot).

<script>
const serverCount = document.getElementById("serverCount");
const verifiedToday = document.getElementById("verifiedToday");
const verifiedAll = document.getElementById("verifiedAll");
const emailsToday = document.getElementById("emailsToday");
const emailsAll = document.getElementById("emailsAll");

function refreshData(){
  fetch('https://services-jbcemail.alwaysdata.net/stats/current')
    .then(response => response.json())
    .then(data => {
      serverCount.textContent = data.serverCount;
      verifiedToday.textContent = data.usersVerifiedToday;
      verifiedAll.textContent = data.usersVerifiedAll;
      emailsToday.textContent = data.mailsSendToday;
      emailsAll.textContent = data.mailsSendAll;
    })
    .catch(() => {});
}
refreshData();
setInterval(refreshData, 10000);
</script>

```

# docs\legal.md

```md
# Legal

The Terms of Service and Privacy Policy for the Discord EmailBot.

**Last Updated:** January 2026

## Terms of Service

### Usage Agreement

By inviting the Bot to your server or using its features, you agree to the following Terms of Service and Privacy Policy.

The privilege of using and inviting this bot can be revoked for any server or user if the Terms of Service or Privacy
Policy of this Bot or the [Terms of Service](https://discord.com/terms), [Privacy Policy](https://discord.com/privacy)
or [Community Guidelines](https://discord.com/guidelines) of Discord gets violated.

The bot is allowed to collect data as described in the [Privacy Policy](#privacy-policy).

### Intended Age

Users under the minimum age specified in Discord's [Terms of Service](https://discord.com/terms) are not allowed to use this bot.

### Affiliation

This Bot is not affiliated with, supported, or made by Discord Inc.

### Disclaimer of Warranty

THE BOT IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

The creator does not guarantee that the bot will be uninterrupted, secure, error-free, or that any defects will be corrected.

### Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE CREATOR OF THE BOT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:

- Loss of data or information
- Service interruptions or downtime
- Unauthorized access to your server or data
- Any damages arising from the use or inability to use the bot
- Any conduct or content of any third party using the bot

Use of this bot is at your own risk. The creator is not responsible for any actions taken by server administrators using this bot.

### Service Availability

The bot is provided on a voluntary basis. The creator reserves the right to modify, suspend, or discontinue the service at any time without prior notice or liability.

### Modifications to Terms

These terms can be updated at any time by the owner of the bot. Continued use of the bot after changes constitutes acceptance of the new terms. Any user can opt out of these new terms by removing the Bot from their servers.

### Contact

Discord Server: [Official UTM JBC Discord](https://discord.gg/vuGTVyFgck)

Email: <a href="mailto:admin@rahbab.com">Send Email</a>

---

## Privacy Policy

### Overview

This Privacy Policy explains how the EmailBot collects, uses, and protects your information when you use our service.

### Data Controller

The data controller responsible for your information is the administrator of UTMJBC Bot, reachable at [admin@rahbab.com](mailto:admin@rahbab.com).

### Legal Basis for Processing

We process your data based on:

- **Legitimate interest:** To provide the email verification service
- **Consent:** By using the bot, you consent to the collection and processing of data as described

### Data Usage

The bot uses the stored data to:

- Verify that no email addresses are used multiple times
- Store server-specific settings and configurations
- Provide the verification functionality

The data is only used by the EmailBot and will not be shared with any third-party services.

### Stored Information

The following data is stored by the bot:

#### Server Data

| Data | Description |
|------|-------------|
| `id` | Server ID |
| `domains` | Verified/allowed email domains |
| `verifiedrole` | Role assigned to verified users |
| `unverifiedrole` | Role assigned to unverified users |
| `channelid` | Reference to the channel with the verify message |
| `messageid` | Reference to the verify message |
| `language` | Language setting for the server |
| `autoVerify` | Automatically verify users when joining |
| `autoAddUnverified` | Automatically add the unverified role to new members |
| `verifyMessage` | Custom message shown to users during verification |
| `logChannel` | Channel for logging verified user emails |
| `blacklist` | List of blocked email addresses |
| `errorNotifyType` | Error notification preference (owner, user, or channel) |
| `errorNotifyTarget` | User ID or channel ID for error notifications |

#### Server Statistics

| Data | Description |
|------|-------------|
| `guildID` | Server ID |
| `mailsSentTotal` | Total number of verification emails sent |
| `mailsSentMonth` | Number of verification emails sent this month |
| `verificationsTotal` | Total number of successful verifications |
| `verificationsMonth` | Number of successful verifications this month |
| `statsMonth` | Current month for tracking (resets monthly counters) |

#### User Data

| Data | Description |
|------|-------------|
| `userid` | Discord user ID |
| `email` | Hashed version of the email address (not stored in plain text) |
| `guildid` | Server ID where verification occurred |
| `groupid` | Group identifier for the verification |
| `isPublic` | Whether the email verification is public |

### Data Security

- Email addresses are stored as cryptographic hashes, not in plain text
- We implement reasonable security measures to protect your data
- However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security

### Data Retention

- **Server data:** Retained until the bot is removed from the server or data is manually deleted
- **User data:** Retained until manually deleted by the user or server administrator

### Your Rights

You have the right to:

- **Access:** Request information about what data we store about you
- **Rectification:** Request correction of inaccurate data
- **Erasure:** Request deletion of your data (see [Removal of Data](#removal-of-data))
- **Portability:** Request a copy of your data

To exercise these rights, use the bot commands or contact us via email.

### Removal of Data

#### Server Data

- Server administrators can remove all server and associated user data using `/delete_server_data`
- When the bot is removed from a server, all related data is automatically deleted

#### User Data

- Users can remove their own data using `/delete_user_data`

### Children's Privacy

This bot is not intended for users under the minimum age required by Discord's Terms of Service. We do not knowingly collect data from children under this age.

### Changes to Privacy Policy

We may update this Privacy Policy from time to time. Changes will be indicated by updating the "Last Updated" date at the top of this document. Continued use of the bot constitutes acceptance of any changes.

### Contact

For any privacy-related questions or concerns, please contact:

- Discord Server: [Official UTM JBC Discord](https://discord.gg/vuGTVyFgck)
- Email: <a href="mailto:admin@rahbab.com">admin@rahbab.com</a>
```

# docs\robots.txt

```txt
User-Agent: *
Allow: *

```

# docs\statistics.md

```md
<meta name="description" content="UTMJBC Bot Statistics - Track verified users, emails sent, and community growth over time.">
<meta name="keywords" content="UTMJBC Bot Statistics Analytics UTM Discord">

# UTMJBC Bot Statistics

<style>
:root {
    --accent-gold: #d4940a;
    --accent-teal: #0d9488;
    --accent-blue: #2563eb;
    --bg-card: #ffffff;
    --bg-hover: #fafafa;
    --text-primary: #1f2937;
    --text-muted: #6b7280;
    --border-color: #e5e7eb;
    --shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
    --shadow-hover: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
}

.stats-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
}

.stats-hero {
    display: flex;
}

.stats-hero .stat-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px;
}

.stats-hero .stat-value {
    font-size: 3.5rem;
}

.stats-hero .stat-label {
    font-size: 0.85rem;
}

.stats-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.stat-group {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 16px 20px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
}

.stat-group-icon {
    font-size: 1.5rem;
    opacity: 0.7;
}

.stat-group-content {
    display: flex;
    gap: 24px;
    flex: 1;
}

.stat-item {
    text-align: center;
}

.stat-card {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover, .stat-group:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-gold);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    margin-bottom: 2px;
}

.stat-value.teal { color: var(--accent-teal); }
.stat-value.blue { color: var(--accent-blue); }

.stat-label {
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

@media (max-width: 600px) {
    .stats-wrapper {
        grid-template-columns: 1fr;
    }
    .stats-hero .stat-value {
        font-size: 2.5rem;
    }
    .stat-group-content {
        gap: 16px;
    }
}

.chart-section {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
}

.chart-title {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
}

.chart-wrapper {
    position: relative;
    height: 280px;
}

.controls {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.control-btn {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    color: var(--text-muted);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
}

.control-btn:hover {
    background: var(--bg-hover);
    border-color: var(--accent-gold);
    color: var(--text-primary);
}

.control-btn.active {
    background: var(--accent-gold);
    color: white;
    border-color: var(--accent-gold);
}

.legend {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.legend-dot.gold { background: var(--accent-gold); }
.legend-dot.teal { background: var(--accent-teal); }
.legend-dot.blue { background: var(--accent-blue); }

.last-updated {
    text-align: right;
    color: var(--text-muted);
    font-size: 0.75rem;
    margin-top: 12px;
}
</style>

<div class="stats-wrapper">
    <div class="stats-hero">
        <div class="stat-card">
            <div class="stat-value blue" id="serverCount">-</div>
            <div class="stat-label">Discord Servers</div>
        </div>
    </div>
    <div class="stats-column">
        <div class="stat-group">
            <div class="stat-group-icon">✓</div>
            <div class="stat-group-content">
                <div class="stat-item">
                    <div class="stat-value" id="verifiedToday">-</div>
                    <div class="stat-label">Today</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="verifiedAll">-</div>
                    <div class="stat-label">All Time</div>
                </div>
            </div>
        </div>
        <div class="stat-group">
            <div class="stat-group-icon">✉</div>
            <div class="stat-group-content">
                <div class="stat-item">
                    <div class="stat-value teal" id="emailsToday">-</div>
                    <div class="stat-label">Today</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value teal" id="emailsAll">-</div>
                    <div class="stat-label">All Time</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="controls">
    <button class="control-btn active" data-days="7">7 Days</button>
    <button class="control-btn" data-days="14">14 Days</button>
    <button class="control-btn" data-days="30">30 Days</button>
    <button class="control-btn" data-days="90">90 Days</button>
</div>

<div class="chart-section">
    <div class="chart-title">📊 Daily Activity</div>
    <div class="chart-wrapper">
        <canvas id="dailyChart"></canvas>
    </div>
    <div class="legend">
        <div class="legend-item"><span class="legend-dot gold"></span> Users Verified</div>
        <div class="legend-item"><span class="legend-dot teal"></span> Emails Sent</div>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">📉 Verification Rate</div>
    <div class="chart-wrapper">
        <canvas id="verificationRateChart"></canvas>
    </div>
    <div class="legend">
        <div class="legend-item"><span class="legend-dot gold"></span> Verified / Emails Sent (%)</div>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">📈 Total Users Verified</div>
    <div class="chart-wrapper">
        <canvas id="verifiedTotalChart"></canvas>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">✉️ Total Emails Sent</div>
    <div class="chart-wrapper">
        <canvas id="emailsTotalChart"></canvas>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">🌐 Server Growth</div>
    <div class="chart-wrapper">
        <canvas id="serversChart"></canvas>
    </div>
</div>

<div class="last-updated">Last updated: <span id="lastUpdated">-</span></div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const API_BASE = 'https://services-jbcemail.alwaysdata.net';

const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280'
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280',
                precision: 0
            }
        }
    }
};

const autoScaleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280'
            }
        },
        y: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280',
                precision: 0
            }
        }
    }
};

let dailyChart, verificationRateChart, verifiedTotalChart, emailsTotalChart, serversChart;
let currentDays = 7;

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

async function fetchCurrentStats() {
    try {
        const res = await fetch(`${API_BASE}/stats/current`);
        const data = await res.json();
        
        document.getElementById('serverCount').textContent = formatNumber(data.serverCount);
        document.getElementById('verifiedToday').textContent = formatNumber(data.usersVerifiedToday);
        document.getElementById('verifiedAll').textContent = formatNumber(data.usersVerifiedAll);
        document.getElementById('emailsToday').textContent = formatNumber(data.mailsSendToday);
        document.getElementById('emailsAll').textContent = formatNumber(data.mailsSendAll);
        document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
    } catch (err) {
        console.error('Failed to fetch current stats:', err);
    }
}

async function fetchHistoryStats(days) {
    try {
        const res = await fetch(`${API_BASE}/stats/history?days=${days}`);
        return await res.json();
    } catch (err) {
        console.error('Failed to fetch history:', err);
        return [];
    }
}

function createDataset(data, color, label) {
    return {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color.replace('1)', '0.1)'),
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6
    };
}

async function updateCharts(days) {
    const history = await fetchHistoryStats(days);
    
    if (history.length === 0) return;
    
    const labels = history.map(h => formatDate(h.date));
    const verifiedDaily = history.map(h => h.usersVerifiedToday);
    const emailsDaily = history.map(h => h.mailsSendToday);
    const verifiedTotal = history.map(h => h.usersVerifiedAll);
    const emailsTotal = history.map(h => h.mailsSendAll);
    const servers = history.map(h => h.serverCount);
    
    // Destroy existing charts
    if (dailyChart) dailyChart.destroy();
    if (verificationRateChart) verificationRateChart.destroy();
    if (verifiedTotalChart) verifiedTotalChart.destroy();
    if (emailsTotalChart) emailsTotalChart.destroy();
    if (serversChart) serversChart.destroy();
    
    // Daily Activity Chart
    dailyChart = new Chart(document.getElementById('dailyChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verifiedDaily, 'rgba(212, 148, 10, 1)', 'Users Verified'),
                createDataset(emailsDaily, 'rgba(13, 148, 136, 1)', 'Emails Sent')
            ]
        },
        options: baseOptions
    });
    
    // Verification Rate Chart
    const verificationRate = history.map(h => {
        if (h.mailsSendToday === 0) return 0;
        return Math.min(((h.usersVerifiedToday / h.mailsSendToday) * 100), 100);
    });
    
    verificationRateChart = new Chart(document.getElementById('verificationRateChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verificationRate, 'rgba(212, 148, 10, 1)', 'Verification Rate (%)')
            ]
        },
        options: {
            ...baseOptions,
            scales: {
                ...baseOptions.scales,
                y: {
                    ...baseOptions.scales.y,
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        ...baseOptions.scales.y.ticks,
                        callback: function(value) { return value + '%'; }
                    }
                }
            },
            plugins: {
                ...baseOptions.plugins,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Total Users Verified Chart (auto-scale, not starting at 0)
    verifiedTotalChart = new Chart(document.getElementById('verifiedTotalChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verifiedTotal, 'rgba(212, 148, 10, 1)', 'Total Verified')
            ]
        },
        options: autoScaleOptions
    });
    
    // Total Emails Sent Chart (auto-scale, not starting at 0)
    emailsTotalChart = new Chart(document.getElementById('emailsTotalChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(emailsTotal, 'rgba(13, 148, 136, 1)', 'Total Emails')
            ]
        },
        options: autoScaleOptions
    });
    
    // Server Growth Chart (auto-scale, not starting at 0)
    serversChart = new Chart(document.getElementById('serversChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(servers, 'rgba(37, 99, 235, 1)', 'Servers')
            ]
        },
        options: autoScaleOptions
    });
}

// Control buttons
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDays = parseInt(this.dataset.days);
        updateCharts(currentDays);
    });
});

// Initial load
fetchCurrentStats();
updateCharts(currentDays);

// Auto-refresh every 30 seconds
setInterval(fetchCurrentStats, 30000);
</script>

```

# docs\status.md

```md
<meta name="description" content="Status page for UTMJBC Bot services including the mail verification server and bot API.">
<meta name="keywords" content="UTMJBC Bot Status Services Health Check UTM">

# Service Status

<style>
.status-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;
}

.status-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #fafafa;
}

.status-card h3 {
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}

.status-indicator.online {
  background-color: #4caf50;
  box-shadow: 0 0 8px #4caf50;
}

.status-indicator.offline {
  background-color: #f44336;
  box-shadow: 0 0 8px #f44336;
  animation: none;
}

.status-indicator.checking {
  background-color: #ff9800;
  box-shadow: 0 0 8px #ff9800;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.status-text {
  font-size: 14px;
  color: #666;
  margin: 4px 0 0 24px;
}

.status-url {
  font-size: 12px;
  color: #888;
  margin: 8px 0 0 24px;
  font-family: monospace;
}

.last-checked {
  font-size: 12px;
  color: #999;
  margin-top: 16px;
  text-align: right;
}
</style>

<div class="status-container">
  <div class="status-card">
    <h3>
      <span id="api-indicator" class="status-indicator checking"></span>
      UTMJBC API
    </h3>
    <div id="api-status" class="status-text">Checking...</div>
    <div class="status-url">https://services-jbcemail.alwaysdata.net</div>
  </div>

  <div class="status-card">
    <h3>
      <span id="mail-indicator" class="status-indicator checking"></span>
      Mail Server
    </h3>
    <div id="mail-status" class="status-text">Checking...</div>
    <div class="status-url">services-jbcemail.alwaysdata.net</div>
  </div>

  <div class="status-card">
    <h3>
      <span id="delivery-indicator" class="status-indicator checking"></span>
      Email Delivery
    </h3>
    <div id="delivery-status" class="status-text">Checking...</div>
    <div id="delivery-details" class="status-url"></div>
  </div>
</div>

<div id="last-checked" class="last-checked"></div>

## Service Details

| Service | Description | Endpoint |
|---------|-------------|----------|
| UTMJBC API | Provides statistics and event scraper functionality | `services-jbcemail.alwaysdata.net` |
| Mail Server | SMTP server for sending verification emails | `services-jbcemail.alwaysdata.net` |
| Email Delivery | Monitors email send/verification ratio | - |

## Need Help?

If you're experiencing issues with the bot, please join our [Community Discord](https://discord.gg/vuGTVyFgck).

<script>
const apiIndicator = document.getElementById('api-indicator');
const apiStatus = document.getElementById('api-status');
const mailIndicator = document.getElementById('mail-indicator');
const mailStatus = document.getElementById('mail-status');
const deliveryIndicator = document.getElementById('delivery-indicator');
const deliveryStatus = document.getElementById('delivery-status');
const deliveryDetails = document.getElementById('delivery-details');
const lastChecked = document.getElementById('last-checked');

let latestStats = null;

function updateLastChecked() {
  const now = new Date();
  lastChecked.textContent = 'Last checked: ' + now.toLocaleTimeString();
}

async function checkApiStatus() {
  try {
    const response = await fetch('https://services-jbcemail.alwaysdata.net/stats/current', {
      method: 'GET',
      mode: 'cors'
    });
    if (response.ok) {
      const data = await response.json();
      latestStats = data;
      apiIndicator.className = 'status-indicator online';
      apiStatus.textContent = 'Operational - Serving ' + data.serverCount + ' servers';
    } else {
      latestStats = null;
      apiIndicator.className = 'status-indicator offline';
      apiStatus.textContent = 'Degraded - HTTP ' + response.status;
    }
  } catch (error) {
    latestStats = null;
    apiIndicator.className = 'status-indicator offline';
    apiStatus.textContent = 'Offline or unreachable';
  }
}

async function checkMailStatus() {
  try {
    // Check service via HTTPS
    const response = await fetch('https://services-jbcemail.alwaysdata.net', {
      method: 'HEAD',
      mode: 'no-cors'
    });
    // no-cors mode always returns opaque response, so we assume it's online if no network error
    mailIndicator.className = 'status-indicator online';
    mailStatus.textContent = 'Operational';
  } catch (error) {
    mailIndicator.className = 'status-indicator offline';
    mailStatus.textContent = 'Offline or unreachable';
  }
}

function checkDeliveryStatus() {
  if (!latestStats) {
    deliveryIndicator.className = 'status-indicator offline';
    deliveryStatus.textContent = 'Unable to check - API unavailable';
    deliveryDetails.textContent = '';
    return;
  }

  const emailsSent = latestStats.mailsSendToday || 0;
  const usersVerified = latestStats.usersVerifiedToday || 0;

  deliveryDetails.textContent = 'Today: ' + emailsSent + ' emails sent, ' + usersVerified + ' users verified';

  // No emails sent today
  if (emailsSent === 0) {
    deliveryIndicator.className = 'status-indicator checking';
    deliveryStatus.textContent = 'No activity - No emails sent today';
    return;
  }

  // Calculate verification rate
  const verificationRate = usersVerified / emailsSent;

  // If verification rate is below 30% and at least 5 emails sent, there might be a problem
  if (emailsSent >= 5 && verificationRate < 0.3) {
    deliveryIndicator.className = 'status-indicator offline';
    deliveryStatus.textContent = 'Potential issue - Low verification rate (' + Math.round(verificationRate * 100) + '%)';
  }
  // If verification rate is below 50% and significant volume, show warning
  else if (emailsSent >= 10 && verificationRate < 0.5) {
    deliveryIndicator.className = 'status-indicator checking';
    deliveryStatus.textContent = 'Warning - Below average verification rate (' + Math.round(verificationRate * 100) + '%)';
  }
  // All good
  else {
    deliveryIndicator.className = 'status-indicator online';
    deliveryStatus.textContent = 'Healthy - ' + Math.round(verificationRate * 100) + '% verification rate';
  }
}

async function checkAllServices() {
  await Promise.all([checkApiStatus(), checkMailStatus()]);
  checkDeliveryStatus();
  updateLastChecked();
}

// Initial check
checkAllServices();

// Refresh every 30 seconds
setInterval(checkAllServices, 30000);
</script>

```

# images\bothierarchy.png

This is a binary file of the type: Image

# images\discord.png

This is a binary file of the type: Image

# images\discordjs.png

This is a binary file of the type: Image

# images\djs.png

This is a binary file of the type: Image

# images\emailbot-banner.png

This is a binary file of the type: Image

# images\emailbot-border-old.png

This is a binary file of the type: Image

# images\emailbot-border.png

This is a binary file of the type: Image

# images\emailbot-old.png

This is a binary file of the type: Image

# images\emailbot.png

This is a binary file of the type: Image

# images\node.png

This is a binary file of the type: Image

# images\nodemailer.webp

This is a binary file of the type: Image

# images\npm.png

This is a binary file of the type: Image

# language\brazilianPortuguese.json

```json
{
  "mailPositive": "Por favor, insira aqui o código recebido em %VAR% (Confira a pasta de spam, se você não tiver recebido o código).",
  "mailFailedTitle": "❌ Falha no Envio de Email",
  "mailFailedDescription": "Não foi possível enviar o email de verificação para:\n`%VAR%`\n\n**Possíveis razões:**\n• O endereço de email não existe\n• O servidor de email rejeitou a mensagem\n• Há um problema temporário de entrega\n\nPor favor, verifique seu endereço de email e tente novamente.",
  "roleAdded": "Role adicionada %VAR%",
  "mailInvalid": "Por favor, insira apenas email válido",
  "mailBlacklistedTitle": "🚫 Email Bloqueado",
  "mailBlacklistedDescription": "O endereço de email que você inseriu foi bloqueado pelo administrador do servidor.\n\nIsso pode ser porque:\n• O domínio de email não é permitido\n• O email específico foi banido\n\nSe você acredita que isso é um erro, por favor contate um administrador do servidor.",
  "mailTimeoutTitle": "⏳ Por Favor Aguarde",
  "mailTimeoutDescription": "Você está enviando emails muito rápido.\n\nPor favor aguarde **%VAR% segundos** antes de solicitar outro código de verificação.\n\nEsse limite ajuda a prevenir spam e garante entrega confiável de emails.",
  "invalidPermissions": "Você não está autorizado a executar este comando!",
  "commandFailed": "Ocorreu um erro ao executar este comando!",
  "userRetry": "Ocorreu um erro. Por favor, remove e adicione a reação novamente.",
  "userBotError": "Bot não configurado corretamente. Por favor contate o Administrador!",
  "userEnterEmail": "Por favor, insira o seu endereço de email para verificar %VAR%.",
  "userCantFindRole": "Não foi possível encontrar as roles. Por favor contate o administrador! Ajuda: Confirme que o nome continua igual, e que a role do bot é maior que a role de verificado e não verificado no menu de configuração do servidor.",
  "emailSubject": "Aviso de confirmação",
  "emailSenderName": "Confirmação",
  "emailText": "Olá,\n\nEsta é uma mensagem de confirmação automática para o servidor:\n\n%VAR%\n\nSeu código:\n\n%VAR%\n\nSe você não esperava esta mensagem, pode ignorá-la.",
  "verifyEmbedTitle": "✉️ Verificação de Email",
  "verifyEmbedInstructions": "Clique no botão abaixo para iniciar o processo de verificação. Você receberá um código por email.\n\nJá tem um código? Use o botão **Inserir Código**.",
  "verifyEmbedFooter": "Sistema de Verificação",
  "verifyDmDescription": "Bem vindo ao **%VAR%**! Clique no botão abaixo para verificar seu endereço de email e obter acesso ao servidor.",
  "verifyDmButton": "Iniciar Verificação",
  "verifyDmAdminWarning": "Nota: O administrador do servidor pode ver o endereço de email que você usar",
  "buttonCreated": "✅ Botão de verificação criado com sucesso!",
  "emailModalTitle": "📧 Verificação de Email",
  "emailModalHeader": "## Verifique Sua Identidade\nInsira seu endereço de email abaixo para receber um código de verificação.",
  "emailModalLabel": "Endereço de Email",
  "emailModalPlaceholder": "seu.nome@",
  "emailModalAdminWarning": "\n\n⚠️ **Nota:** O administrador do servidor pode ver o endereço de email que você usar.",
  "emailModalAllDomainsAccepted": "✅ Qualquer endereço de email é aceito",
  "emailModalAcceptedDomains": "📋 **Você deve usar um email de um destes domínios:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ ex. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Roles que você receberá**",
  "codeModalTitle": "🔐 Insira o Código de Verificação",
  "codeModalHeader": "## Quase Lá!\nVerifique sua caixa de entrada para o código de verificação de 6 dígitos.",
  "codeModalLabel": "Código de Verificação",
  "codeModalPlaceholder": "Insira o código de 6 dígitos",
  "enterCodeButton": "Inserir Código",
  "codePromptTitle": "📬 Código Enviado!",
  "codePromptDescription": "Um código de verificação foi enviado para:\n`%VAR%`\n\nClique no botão abaixo para inserir seu código.",
  "codePromptTip": "💡 Não recebeu?",
  "codePromptTipValue": "Verifique sua pasta de spam/lixo eletrônico. O email pode levar alguns minutos para chegar.",
  "mailInvalidTitle": "❌ Email Inválido",
  "mailInvalidDescription": "O endereço de email que você inseriu não é válido.\n\nCertifique-se de que:\n• O email tem o formato correto (nome@dominio.com)\n• Você está usando um domínio de email permitido\n• Não há espaços no endereço",
  "verificationSuccessTitle": "✅ Verificação Concluída!",
  "verificationSuccessDescription": "Bem vindo! Você foi verificado com sucesso.\n\n**Role atribuída:** %VAR%\n**Servidor:** %VAR%\n\nAgora você tem acesso total ao servidor.",
  "invalidCodeTitle": "❌ Código Inválido",
  "invalidCodeDescription": "O código que você inseriu está incorreto.\n\n**O que fazer:**\n• Verifique novamente o código de 6 dígitos do seu email\n• Certifique-se de estar usando o código mais recente\n• Solicite um novo código se necessário clicando no botão de verificação novamente",
  "errorGenericTitle": "❌ Ocorreu um Erro",
  "errorGenericDescription": "Algo deu errado ao processar sua solicitação. O administrador do servidor foi notificado e irá verificar.",
  "errorFieldGuild": "Servidor",
  "errorFieldUser": "Usuário",
  "errorFallbackWarning": "⚠️ Notificação de Fallback",
  "errorNotifyChannelFailed": "O canal de erro configurado não existe mais ou o bot não consegue enviar mensagens lá. O erro foi enviado ao proprietário. Por favor reconfigure usando `/set_error_notify`.",
  "errorNotifyUserFailed": "O usuário configurado para notificações não está mais no servidor ou desativou DMs. O erro foi enviado ao proprietário. Por favor reconfigure usando `/set_error_notify`.",
  "errorNotifySetOwner": "✅ Notificações de erro agora serão enviadas ao proprietário do servidor via DM.",
  "errorNotifySetChannel": "✅ Notificações de erro agora serão enviadas para #%VAR%.",
  "errorNotifySetUser": "✅ Notificações de erro agora serão enviadas para %VAR% via DM.",
  "errorNotifyInvalidChannel": "❌ Por favor selecione um canal de texto para notificações de erro.",
  "errorNotifyUserNotInGuild": "❌ O usuário selecionado não é membro deste servidor.",
  "errorNotifyStatusTitle": "📋 Configurações de Notificação de Erro",
  "errorNotifyStatusOwner": "Notificações de erro são enviadas ao **proprietário do servidor** (%VAR%) via DM.",
  "errorNotifyStatusChannel": "Notificações de erro são enviadas para **#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ Notificações estão configuradas para um canal que não existe mais. O proprietário do servidor será usado.",
  "errorNotifyStatusUser": "Notificações de erro são enviadas para **%VAR%** via DM.",
  "errorNotifyStatusUserInvalid": "⚠️ Notificações estão configuradas para um usuário que não está mais no servidor. O proprietário do servidor será usado.",
  "errorNotifyStatusNote": "ℹ️ Nota",
  "errorNotifyStatusNoteValue": "Se o método de notificação configurado falhar, os erros serão automaticamente enviados ao proprietário do servidor.",
  "errorRoleAssignTitle": "Erro de Atribuição de Role",
  "errorRoleAssignMessage": "Falha ao atribuir a role verificado/não verificado a um usuário. Por favor verifique:\n• A role do bot está acima das roles verificado/não verificado\n• As roles ainda existem\n• O bot tem a permissão 'Gerenciar Cargos'\n\n💡 **Dica:** Mova a role do EmailBot acima das roles verificado/não verificado em Configurações do Servidor → Cargos, ou atribua a role verificado/não verificado diretamente ao bot.\n[Ver exemplo](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot Não Configurado",
  "errorBotNotConfiguredMessage": "Um usuário tentou se verificar mas o bot não está configurado corretamente.\n\n**Configuração necessária:**\n• Definir domínios de email permitidos com `/domain add`\n• Definir role verificado com `/role verified`\n\nExecute `/status` para verificar a configuração atual."
}

```

# language\english.json

```json
{
  "mailPositive": "Please enter the code you received at %VAR% (Check the spam folder if you do not receive a code).",
  "mailFailedTitle": "❌ Email Delivery Failed",
  "mailFailedDescription": "We couldn't send the verification email to:\n`%VAR%`\n\n**Possible reasons:**\n• The email address doesn't exist\n• The email server rejected the message\n• There's a temporary delivery issue\n\nPlease double-check your email address or try to <#1423586040874270740>.",
  "roleAdded": "Added role %VAR%",
  "mailInvalid": "Please enter only valid email addresses",
  "mailBlacklistedTitle": "🚫 Email Blocked",
  "mailBlacklistedDescription": "The email address you entered has been blocked by the server administrator.\n\nThis could be because:\n• The email domain is not allowed\n• The specific email has been banned\n\nIf you believe this is an error, please contact a server administrator.",
  "mailTimeoutTitle": "⏳ Please Wait",
  "mailTimeoutDescription": "You're sending emails too quickly.\n\nPlease wait **%VAR% seconds** before requesting another verification code.\n\nThis limit helps prevent spam and ensures reliable email delivery.",
  "invalidPermissions": "You are not allowed to execute this command!",
  "commandFailed": "There was an error while executing this command!",
  "userRetry": "An error occurred. Please remove and add the reaction to try again.",
  "userBotError": "Bot not properly configured. Please contact admin!",
  "userEnterEmail": "Please enter your email address to verify %VAR%.",
  "userCantFindRole": "Cant find roles. Please contact the admin! Help: Ensure that the name is still the same and that the bot role is higher in the serversettings role menu then the verified and unverified role.",
  "emailSubject": "Your Discord verification code",
  "emailSenderName": "UTMJBC",
  "emailText": "Welcome! Salam Sejahtera!\n\nTo ensure that this is a safe space for UTM students only, we require new members to verify.\n\n Upon verification, you will gain access to a number of different channels; such as faculty channels, UTM discussion and so much more!\n\nYour verification code: %VAR%\n\nDo NOT share this code to anyone else other than the UTMJBC Bot.",
  "verifyEmbedTitle": "✉️ Email Verification",
  "verifyEmbedInstructions": "Click the button below to start the verification process. You will receive a code via email.\n\nAlready have a code? Use the **Enter Code** button.",
  "verifyEmbedFooter": "Verification System",
  "verifyDmDescription": "Welcome to **%VAR%**! Click the button below to verify your email address and gain access to the server.",
  "verifyDmButton": "Start Verification",
  "verifyDmAdminWarning": " ",
  "buttonCreated": "✅ Verification button created successfully!",
  "emailModalTitle": "📧 Email Verification",
  "emailModalHeader": "## Verify Your Identity\nEnter your email address below to receive a verification code.",
  "emailModalLabel": "Email Address",
  "emailModalPlaceholder": "your.name@",
  "emailModalAdminWarning": " ",
  "emailModalAllDomainsAccepted": "✅ Any email address is accepted",
  "emailModalAcceptedDomains": "📋 **You must use an email from one of these domains:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ e.g. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Roles you will receive**",
  "codeModalTitle": "🔐 Enter Verification Code",
  "codeModalHeader": "## Almost There!\nCheck your inbox for the 6-digit verification code.",
  "codeModalLabel": "Verification Code",
  "codeModalPlaceholder": "Enter 6-digit code",
  "enterCodeButton": "Enter Code",
  "codePromptTitle": "📬 Code Sent!",
  "codePromptDescription": "A verification code has been sent to:\n`%VAR%`\n\nClick the button below to enter your code.",
  "codePromptTip": "💡 Didn't receive it?",
  "codePromptTipValue": "Check your spam/junk folder. The email may take a few minutes to arrive.",
  "mailInvalidTitle": "❌ Invalid Email",
  "mailInvalidDescription": "The email address you entered is not valid.\n\nPlease make sure:\n• The email has the correct format (name@domain.com)\n• You're using an allowed email domain\n• There are no spaces in the address",
  "verificationSuccessTitle": "✅ Verification Complete!",
  "verificationSuccessDescription": "Welcome! You have been successfully verified.\n\nYou now have full access to the server.",
  "invalidCodeTitle": "❌ Invalid Code",
  "invalidCodeDescription": "The code you entered is incorrect.\n\n**What to do:**\n• Double-check the 6-digit code from your email\n• Make sure you're using the most recent code\n• Request a new code if needed by clicking the verification button again",
  "errorGenericTitle": "❌ An Error Occurred",
  "errorGenericDescription": "Something went wrong while processing your request. The server administrator has been notified and will look into it.",
  "errorFieldGuild": "Server",
  "errorFieldUser": "User",
  "errorFallbackWarning": "⚠️ Notification Fallback",
  "errorNotifyChannelFailed": "The configured error channel no longer exists or the bot cannot send messages there. Error was sent to you (the owner) instead. Please reconfigure using `/set_error_notify`.",
  "errorNotifyUserFailed": "The configured error notification user is no longer in the server or has DMs disabled. Error was sent to you (the owner) instead. Please reconfigure using `/set_error_notify`.",
  "errorNotifySetOwner": "✅ Error notifications will now be sent to the server owner via DM.",
  "errorNotifySetChannel": "✅ Error notifications will now be sent to #%VAR%.",
  "errorNotifySetUser": "✅ Error notifications will now be sent to %VAR% via DM.",
  "errorNotifyInvalidChannel": "❌ Please select a text channel for error notifications.",
  "errorNotifyUserNotInGuild": "❌ The selected user is not a member of this server.",
  "errorNotifyStatusTitle": "📋 Error Notification Settings",
  "errorNotifyStatusOwner": "Error notifications are sent to the **server owner** (%VAR%) via DM.",
  "errorNotifyStatusChannel": "Error notifications are sent to **#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ Error notifications are configured for a channel that no longer exists. Notifications will fall back to the server owner.",
  "errorNotifyStatusUser": "Error notifications are sent to **%VAR%** via DM.",
  "errorNotifyStatusUserInvalid": "⚠️ Error notifications are configured for a user who is no longer in the server. Notifications will fall back to the server owner.",
  "errorNotifyStatusNote": "ℹ️ Note",
  "errorNotifyStatusNoteValue": "If the configured notification method fails, errors will automatically fall back to the server owner.",
  "errorRoleAssignTitle": "Role Assignment Error",
  "errorRoleAssignMessage": "Failed to assign the verified/unverified role to a user. Please ensure:\n• The bot's role is higher than the verified/unverified roles\n• The roles still exist\n• The bot has 'Manage Roles' permission\n\n💡 **Tip:** Either move the EmailBot role above the verified/unverified roles in Server Settings → Roles, or assign the verified/unverified role to the bot directly.\n[See example](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot Not Configured",
  "errorBotNotConfiguredMessage": "A user tried to verify but the bot is not properly configured.\n\n**Required setup:**\n• Set allowed email domains with `/domain add`\n• Set default roles with `/role add` or domain-specific roles with `/domainrole add`\n\nRun `/status` to check the current configuration."
}

```

# language\french.json

```json
{
    "mailPositive": "Envoyez-moi le code que vous avez reçu à %VAR% (Vérifiez vos \"spams\" si vous n'avez pas reçu de code).",
    "mailFailedTitle": "❌ Échec de l'Envoi d'Email",
    "mailFailedDescription": "Nous n'avons pas pu envoyer l'email de vérification à :\n`%VAR%`\n\n**Raisons possibles :**\n• L'adresse email n'existe pas\n• Le serveur email a rejeté le message\n• Il y a un problème temporaire de livraison\n\nVeuillez vérifier votre adresse email et réessayer.",
    "roleAdded": "Rôle %VAR% ajouté.",
    "mailInvalid": "Merci d'entrer une adresse mail valide.",
    "mailBlacklistedTitle": "🚫 Email Bloqué",
    "mailBlacklistedDescription": "L'adresse email que vous avez entrée a été bloquée par l'administrateur du serveur.\n\nCela pourrait être parce que :\n• Le domaine email n'est pas autorisé\n• L'email spécifique a été banni\n\nSi vous pensez qu'il s'agit d'une erreur, veuillez contacter un administrateur du serveur.",
    "mailTimeoutTitle": "⏳ Veuillez Patienter",
    "mailTimeoutDescription": "Vous envoyez des emails trop rapidement.\n\nVeuillez attendre **%VAR% secondes** avant de demander un autre code de vérification.\n\nCette limite aide à prévenir le spam et assure une livraison fiable des emails.",
    "invalidPermissions": "Vous n'êtes pas autorisé(e) à envoyer cette commande !",
    "commandFailed": "Il y a eu une erreur lors de l'exécution de cette commande !",
    "userRetry": "Une erreur s'est produite. Retirez et rajoutez votre réaction avant de réessayer.",
    "userBotError": "Le bot n'est pas configuré correctement. Contactez un admin !",
    "userEnterEmail": "Entrez votre adresse mail pour vous vérifier %VAR%.",
    "userCantFindRole": "Impossible de trouver ce rôle. Merci de contacter un admin ! Aide : Assurez-vous que le nom est toujours le même, et que le rôle du bot est plus haut que le rôle \"vérifié\" et \"non-vérifié\" dans le menu des rôles des paramètres de votre serveur.",
    "emailSubject": "Avis de confirmation",
    "emailSenderName": "Confirmation",
    "emailText": "Bonjour,\n\nCeci est un message de confirmation automatique pour le serveur :\n\n%VAR%\n\nVotre code :\n\n%VAR%\n\nSi vous n'attendiez pas ce message, vous pouvez l'ignorer.",
    "verifyEmbedTitle": "✉️ Vérification par Email",
    "verifyEmbedInstructions": "Cliquez sur le bouton ci-dessous pour démarrer le processus de vérification. Vous recevrez un code par email.\n\nVous avez déjà un code ? Utilisez le bouton **Entrer le Code**.",
    "verifyEmbedFooter": "Système de Vérification",
    "verifyDmDescription": "Bienvenue sur **%VAR%** ! Cliquez sur le bouton ci-dessous pour vérifier votre adresse email et accéder au serveur.",
    "verifyDmButton": "Démarrer la Vérification",
    "verifyDmAdminWarning": "Note : L'administrateur du serveur peut voir l'adresse email que vous utilisez",
    "buttonCreated": "✅ Bouton de vérification créé avec succès !",
    "emailModalTitle": "📧 Vérification par Email",
    "emailModalHeader": "## Vérifiez Votre Identité\nEntrez votre adresse email ci-dessous pour recevoir un code de vérification.",
    "emailModalLabel": "Adresse Email",
    "emailModalPlaceholder": "votre.nom@",
    "emailModalAdminWarning": "\n\n⚠️ **Note :** L'administrateur du serveur peut voir l'adresse email que vous utilisez.",
    "emailModalAllDomainsAccepted": "✅ Toute adresse email est acceptée",
    "emailModalAcceptedDomains": "📋 **Vous devez utiliser un email de l'un de ces domaines :**",
    "emailModalDomainExample": "`%VAR%`\n    ↳ ex. `%VAR%`",
    "emailModalRolesAssigned": "🎭 **Rôles que vous recevrez**",
    "codeModalTitle": "🔐 Entrer le Code de Vérification",
    "codeModalHeader": "## Presque Terminé !\nVérifiez votre boîte de réception pour le code de vérification à 6 chiffres.",
    "codeModalLabel": "Code de Vérification",
    "codeModalPlaceholder": "Entrez le code à 6 chiffres",
    "enterCodeButton": "Entrer le Code",
    "codePromptTitle": "📬 Code Envoyé !",
    "codePromptDescription": "Un code de vérification a été envoyé à :\n`%VAR%`\n\nCliquez sur le bouton ci-dessous pour entrer votre code.",
    "codePromptTip": "💡 Pas reçu ?",
    "codePromptTipValue": "Vérifiez votre dossier spam/indésirables. L'email peut prendre quelques minutes à arriver.",
    "mailInvalidTitle": "❌ Email Invalide",
    "mailInvalidDescription": "L'adresse email que vous avez entrée n'est pas valide.\n\nAssurez-vous que :\n• L'email a le bon format (nom@domaine.com)\n• Vous utilisez un domaine email autorisé\n• Il n'y a pas d'espaces dans l'adresse",
    "verificationSuccessTitle": "✅ Vérification Terminée !",
    "verificationSuccessDescription": "Bienvenue ! Vous avez été vérifié avec succès.\n\n**Rôle assigné :** %VAR%\n**Serveur :** %VAR%\n\nVous avez maintenant un accès complet au serveur.",
    "invalidCodeTitle": "❌ Code Invalide",
    "invalidCodeDescription": "Le code que vous avez entré est incorrect.\n\n**Que faire :**\n• Vérifiez le code à 6 chiffres de votre email\n• Assurez-vous d'utiliser le code le plus récent\n• Demandez un nouveau code si nécessaire en cliquant à nouveau sur le bouton de vérification",
    "errorGenericTitle": "❌ Une Erreur s'est Produite",
    "errorGenericDescription": "Une erreur s'est produite lors du traitement de votre demande. L'administrateur du serveur a été notifié et va s'en occuper.",
    "errorFieldGuild": "Serveur",
    "errorFieldUser": "Utilisateur",
    "errorFallbackWarning": "⚠️ Notification de Secours",
    "errorNotifyChannelFailed": "Le canal d'erreur configuré n'existe plus ou le bot ne peut pas y envoyer de messages. L'erreur a été envoyée au propriétaire. Veuillez reconfigurer avec `/set_error_notify`.",
    "errorNotifyUserFailed": "L'utilisateur configuré pour les notifications n'est plus sur le serveur ou a désactivé les DMs. L'erreur a été envoyée au propriétaire. Veuillez reconfigurer avec `/set_error_notify`.",
    "errorNotifySetOwner": "✅ Les notifications d'erreur seront maintenant envoyées au propriétaire du serveur par DM.",
    "errorNotifySetChannel": "✅ Les notifications d'erreur seront maintenant envoyées à #%VAR%.",
    "errorNotifySetUser": "✅ Les notifications d'erreur seront maintenant envoyées à %VAR% par DM.",
    "errorNotifyInvalidChannel": "❌ Veuillez sélectionner un canal texte pour les notifications d'erreur.",
    "errorNotifyUserNotInGuild": "❌ L'utilisateur sélectionné n'est pas membre de ce serveur.",
    "errorNotifyStatusTitle": "📋 Paramètres de Notification d'Erreur",
    "errorNotifyStatusOwner": "Les notifications d'erreur sont envoyées au **propriétaire du serveur** (%VAR%) par DM.",
    "errorNotifyStatusChannel": "Les notifications d'erreur sont envoyées à **#%VAR%**.",
    "errorNotifyStatusChannelInvalid": "⚠️ Les notifications sont configurées pour un canal qui n'existe plus. Le propriétaire sera utilisé.",
    "errorNotifyStatusUser": "Les notifications d'erreur sont envoyées à **%VAR%** par DM.",
    "errorNotifyStatusUserInvalid": "⚠️ Les notifications sont configurées pour un utilisateur qui n'est plus sur le serveur. Le propriétaire sera utilisé.",
    "errorNotifyStatusNote": "ℹ️ Note",
    "errorNotifyStatusNoteValue": "Si la méthode de notification configurée échoue, les erreurs seront automatiquement envoyées au propriétaire du serveur.",
    "errorRoleAssignTitle": "Erreur d'Attribution de Rôle",
    "errorRoleAssignMessage": "Impossible d'attribuer le rôle vérifié/non-vérifié à un utilisateur. Veuillez vérifier :\n• Le rôle du bot est plus haut que les rôles vérifié/non-vérifié\n• Les rôles existent toujours\n• Le bot a la permission 'Gérer les Rôles'\n\n💡 **Astuce :** Déplacez le rôle EmailBot au-dessus des rôles vérifié/non-vérifié dans Paramètres du serveur → Rôles, ou attribuez le rôle vérifié/non-vérifié directement au bot.\n[Voir l'exemple](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
    "errorBotNotConfiguredTitle": "Bot Non Configuré",
    "errorBotNotConfiguredMessage": "Un utilisateur a tenté de se vérifier mais le bot n'est pas correctement configuré.\n\n**Configuration requise :**\n• Définir les domaines email autorisés avec `/domain add`\n• Définir le rôle vérifié avec `/role verified`\n\nExécutez `/status` pour vérifier la configuration actuelle."
  }
  
```

# language\german.json

```json
{
  "mailPositive": "Bitte gib den Code der zu %VAR% geschickt wurde ein (Prüfen Sie den Spam-Ordner, falls Sie keinen Code erhalten).",
  "mailFailedTitle": "❌ E-Mail-Zustellung fehlgeschlagen",
  "mailFailedDescription": "Die Verifizierungs-E-Mail konnte nicht gesendet werden an:\n`%VAR%`\n\n**Mögliche Gründe:**\n• Die E-Mail-Adresse existiert nicht\n• Der E-Mail-Server hat die Nachricht abgelehnt\n• Es gibt ein vorübergehendes Zustellungsproblem\n\nBitte überprüfe deine E-Mail-Adresse und versuche es erneut.",
  "mailBlacklistedTitle": "🚫 E-Mail blockiert",
  "mailBlacklistedDescription": "Die eingegebene E-Mail-Adresse wurde vom Server-Administrator blockiert.\n\nDies könnte daran liegen:\n• Die E-Mail-Domain ist nicht erlaubt\n• Die spezifische E-Mail wurde gesperrt\n\nWenn du glaubst, dass dies ein Fehler ist, kontaktiere bitte einen Server-Administrator.",
  "roleAdded": "Rolle %VAR% hinzugefügt",
  "mailInvalid": "Bitte gib eine richtige Email Adresse an",
  "mailTimeoutTitle": "⏳ Bitte warten",
  "mailTimeoutDescription": "Du sendest zu schnell E-Mails.\n\nBitte warte **%VAR% Sekunden** bevor du einen weiteren Verifizierungscode anforderst.\n\nDieses Limit hilft Spam zu verhindern und gewährleistet eine zuverlässige E-Mail-Zustellung.",
  "invalidPermissions": "Keine ausreichende Berechtigung um den Befehl auszuführen!",
  "commandFailed": "Bei ausführen des Befehls ist ein Fehler aufgetreten!",
  "userRetry": "Es ist ein Fehler aufgetreten. Bitte entferne die reaction und füge sie erneut hinzu.",
  "userBotError": "Der Bot ist nicht richtig konfiguriert. Bitte kontaktiere den Admin!",
  "userEnterEmail": "Bitte gib deine Email Adresse an um dich zu verifizieren %VAR%.",
  "userCantFindRole": "Rollen konnten nicht gefunden werden. Bitte kontaktiere den Admin! Hilfe: Stelle sicher, dass der Name der Rollen sich nicht verändert hat und, dass im Server Rollen Menü die Bot Rolle höher eingeordnet ist als die Un/Verifiziert Rolle.",
  "emailSubject": "Bestätigungshinweis",
  "emailSenderName": "Bestätigung",
  "emailText": "Hallo,\n\nDies ist eine automatisierte Bestätigungsnachricht für den Server:\n\n%VAR%\n\nIhr Code:\n\n%VAR%\n\nWenn Sie diese Nachricht nicht erwartet haben, können Sie sie ignorieren.",
  "verifyEmbedTitle": "✉️ E-Mail Verifizierung",
  "verifyEmbedInstructions": "Klicke auf den Button unten, um den Verifizierungsprozess zu starten. Du erhältst einen Code per E-Mail.\n\nDu hast bereits einen Code? Nutze den **Code eingeben** Button.",
  "verifyEmbedFooter": "Verifizierungssystem",
  "verifyDmDescription": "Willkommen bei **%VAR%**! Klicke auf den Button unten, um deine E-Mail-Adresse zu verifizieren und Zugang zum Server zu erhalten.",
  "verifyDmButton": "Verifizierung starten",
  "verifyDmAdminWarning": "Hinweis: Der Server-Admin kann die verwendete E-Mail-Adresse sehen",
  "buttonCreated": "✅ Verifizierungs-Button erfolgreich erstellt!",
  "emailModalTitle": "📧 E-Mail Verifizierung",
  "emailModalHeader": "## Bestätige deine Identität\nGib deine E-Mail-Adresse ein, um einen Verifizierungscode zu erhalten.",
  "emailModalLabel": "E-Mail-Adresse",
  "emailModalPlaceholder": "dein.name@",
  "emailModalAdminWarning": "\n\n⚠️ **Hinweis:** Der Server-Admin kann die verwendete E-Mail-Adresse sehen.",
  "emailModalAllDomainsAccepted": "✅ Jede E-Mail-Adresse wird akzeptiert",
  "emailModalAcceptedDomains": "📋 **Du musst eine E-Mail von einer dieser Domains verwenden:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ z.B. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Rollen, die du erhältst**",
  "codeModalTitle": "🔐 Verifizierungscode eingeben",
  "codeModalHeader": "## Fast geschafft!\nPrüfe deinen Posteingang auf den 6-stelligen Verifizierungscode.",
  "codeModalLabel": "Verifizierungscode",
  "codeModalPlaceholder": "6-stelligen Code eingeben",
  "enterCodeButton": "Code eingeben",
  "codePromptTitle": "📬 Code gesendet!",
  "codePromptDescription": "Ein Verifizierungscode wurde gesendet an:\n`%VAR%`\n\nKlicke auf den Button unten, um deinen Code einzugeben.",
  "codePromptTip": "💡 Nicht erhalten?",
  "codePromptTipValue": "Prüfe deinen Spam-/Junk-Ordner. Die E-Mail kann einige Minuten dauern.",
  "mailInvalidTitle": "❌ Ungültige E-Mail",
  "mailInvalidDescription": "Die eingegebene E-Mail-Adresse ist ungültig.\n\nBitte stelle sicher:\n• Die E-Mail hat das richtige Format (name@domain.com)\n• Du verwendest eine erlaubte E-Mail-Domain\n• Es sind keine Leerzeichen in der Adresse",
  "verificationSuccessTitle": "✅ Verifizierung abgeschlossen!",
  "verificationSuccessDescription": "Willkommen! Du wurdest erfolgreich verifiziert.\n\n**Rolle zugewiesen:** %VAR%\n**Server:** %VAR%\n\nDu hast jetzt vollen Zugriff auf den Server.",
  "invalidCodeTitle": "❌ Ungültiger Code",
  "invalidCodeDescription": "Der eingegebene Code ist falsch.\n\n**Was du tun kannst:**\n• Überprüfe den 6-stelligen Code aus deiner E-Mail\n• Stelle sicher, dass du den neuesten Code verwendest\n• Fordere bei Bedarf einen neuen Code an, indem du erneut auf den Verifizierungs-Button klickst",
  "errorGenericTitle": "❌ Ein Fehler ist aufgetreten",
  "errorGenericDescription": "Bei der Verarbeitung deiner Anfrage ist ein Fehler aufgetreten. Der Server-Administrator wurde benachrichtigt und wird sich darum kümmern.",
  "errorFieldGuild": "Server",
  "errorFieldUser": "Benutzer",
  "errorFallbackWarning": "⚠️ Benachrichtigungs-Fallback",
  "errorNotifyChannelFailed": "Der konfigurierte Fehlerkanal existiert nicht mehr oder der Bot kann dort keine Nachrichten senden. Der Fehler wurde stattdessen an dich (den Owner) gesendet. Bitte konfiguriere mit `/set_error_notify` neu.",
  "errorNotifyUserFailed": "Der konfigurierte Fehlerbenachrichtigungs-Benutzer ist nicht mehr auf dem Server oder hat DMs deaktiviert. Der Fehler wurde stattdessen an dich (den Owner) gesendet. Bitte konfiguriere mit `/set_error_notify` neu.",
  "errorNotifySetOwner": "✅ Fehlerbenachrichtigungen werden jetzt per DM an den Server-Owner gesendet.",
  "errorNotifySetChannel": "✅ Fehlerbenachrichtigungen werden jetzt an #%VAR% gesendet.",
  "errorNotifySetUser": "✅ Fehlerbenachrichtigungen werden jetzt per DM an %VAR% gesendet.",
  "errorNotifyInvalidChannel": "❌ Bitte wähle einen Textkanal für Fehlerbenachrichtigungen.",
  "errorNotifyUserNotInGuild": "❌ Der ausgewählte Benutzer ist kein Mitglied dieses Servers.",
  "errorNotifyStatusTitle": "📋 Fehlerbenachrichtigungs-Einstellungen",
  "errorNotifyStatusOwner": "Fehlerbenachrichtigungen werden per DM an den **Server-Owner** (%VAR%) gesendet.",
  "errorNotifyStatusChannel": "Fehlerbenachrichtigungen werden an **#%VAR%** gesendet.",
  "errorNotifyStatusChannelInvalid": "⚠️ Fehlerbenachrichtigungen sind für einen Kanal konfiguriert, der nicht mehr existiert. Benachrichtigungen fallen auf den Server-Owner zurück.",
  "errorNotifyStatusUser": "Fehlerbenachrichtigungen werden per DM an **%VAR%** gesendet.",
  "errorNotifyStatusUserInvalid": "⚠️ Fehlerbenachrichtigungen sind für einen Benutzer konfiguriert, der nicht mehr auf dem Server ist. Benachrichtigungen fallen auf den Server-Owner zurück.",
  "errorNotifyStatusNote": "ℹ️ Hinweis",
  "errorNotifyStatusNoteValue": "Wenn die konfigurierte Benachrichtigungsmethode fehlschlägt, werden Fehler automatisch an den Server-Owner weitergeleitet.",
  "errorRoleAssignTitle": "Rollenzuweisungs-Fehler",
  "errorRoleAssignMessage": "Die Verifiziert/Unverifiziert-Rolle konnte einem Benutzer nicht zugewiesen werden. Bitte stelle sicher:\n• Die Bot-Rolle ist höher als die Verifiziert/Unverifiziert-Rollen\n• Die Rollen existieren noch\n• Der Bot hat die 'Rollen verwalten'-Berechtigung\n\n💡 **Tipp:** Verschiebe die EmailBot-Rolle über die Verifiziert/Unverifiziert-Rollen in Servereinstellungen → Rollen, oder weise dem Bot die Verifiziert/Unverifiziert-Rolle direkt zu.\n[Beispiel ansehen](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot Nicht Konfiguriert",
  "errorBotNotConfiguredMessage": "Ein Benutzer hat versucht sich zu verifizieren, aber der Bot ist nicht richtig konfiguriert.\n\n**Erforderliche Einrichtung:**\n• Erlaubte E-Mail-Domains mit `/domain add` festlegen\n• Verifiziert-Rolle mit `/role verified` festlegen\n\nFühre `/status` aus, um die aktuelle Konfiguration zu überprüfen."
}

```

# language\hebrew.json

```json
{
  "mailPositive": "אנא הזן את הקוד שנשלח אליך אל כתובת המייל %VAR% (אנא בדוק את תיקיית הספאם אם אינך רואה את המייל, יכול להיות שהוא יסונן ויוכנס לשם).",
  "mailFailedTitle": "❌ שליחת המייל נכשלה",
  "mailFailedDescription": "לא הצלחנו לשלוח את מייל האימות אל:\n`%VAR%`\n\n**סיבות אפשריות:**\n• כתובת המייל לא קיימת\n• שרת המייל דחה את ההודעה\n• יש בעיה זמנית במשלוח\n\nאנא בדוק את כתובת המייל שלך ונסה שוב.",
  "roleAdded": "התפקיד הוסף לחשבון %VAR%",
  "mailInvalid": "אנא הזן כתובת מייל תקינה",
  "mailBlacklistedTitle": "🚫 מייל חסום",
  "mailBlacklistedDescription": "כתובת המייל שהזנת נחסמה על ידי מנהל השרת.\n\nזה יכול להיות בגלל:\n• דומיין המייל אינו מותר\n• המייל הספציפי נחסם\n\nאם אתה חושב שזו טעות, אנא פנה למנהל השרת.",
  "mailTimeoutTitle": "⏳ אנא המתן",
  "mailTimeoutDescription": "אתה שולח מיילים מהר מדי.\n\nאנא המתן **%VAR% שניות** לפני בקשת קוד אימות נוסף.\n\nמגבלה זו עוזרת למנוע ספאם ומבטיחה משלוח מייל אמין.",
  "invalidPermissions": "אין לך הרשאות מתאימות להשתמש בפקודה זו!",
  "commandFailed": "אירעה שגיאה במהלך ביצוע פקודה זו!",
  "userRetry": "קרתה תקלה. אנא מחק והוסף מחדש את התגובה בכדי לנסות שוב.",
  "userBotError": "הבוט לא הוגדר כמו שצריך. אנא פנה למנהל השרת!",
  "userEnterEmail": "אנא הזן את כתובת המייל שלך כדי לבצע אימות %VAR%.",
  "userCantFindRole": "התפקידים לא נמצאו. אנא פנה למנהל השרת או לאיש צוות! עזרה: וודאו שהשם של התפקיד אותו הדבר והתפקיד הגבוהה ביותר של הבוט גבוהה יותר מהפתקידים של משתמשים מאומתים ולא מאומתים.",
  "emailSubject": "הודעת אישור",
  "emailSenderName": "אישור",
  "emailText": "שלום,\n\nזוהי הודעת אישור אוטומטית עבור השרת:\n\n%VAR%\n\nהקוד שלך:\n\n%VAR%\n\nאם לא ציפית להודעה זו, תוכל להתעלם ממנה.",
  "verifyEmbedTitle": "✉️ אימות מייל",
  "verifyEmbedInstructions": "לחץ על הכפתור למטה כדי להתחיל את תהליך האימות. תקבל קוד במייל.\n\nכבר יש לך קוד? השתמש בכפתור **הזן קוד**.",
  "verifyEmbedFooter": "מערכת אימות",
  "verifyDmDescription": "ברוך הבא אל **%VAR%**! לחץ על הכפתור למטה כדי לאמת את כתובת המייל שלך ולקבל גישה לשרת.",
  "verifyDmButton": "התחל אימות",
  "verifyDmAdminWarning": "הערה: מנהל השרת יכול לראות את כתובת המייל שאתה משתמש",
  "buttonCreated": "✅ כפתור האימות נוצר בהצלחה!",
  "emailModalTitle": "📧 אימות מייל",
  "emailModalHeader": "## אמת את זהותך\nהזן את כתובת המייל שלך למטה כדי לקבל קוד אימות.",
  "emailModalLabel": "כתובת מייל",
  "emailModalPlaceholder": "השם.שלך@",
  "emailModalAdminWarning": "\n\n⚠️ **הערה:** מנהל השרת יכול לראות את כתובת המייל שאתה משתמש.",
  "emailModalAllDomainsAccepted": "✅ כל כתובת מייל מתקבלת",
  "emailModalAcceptedDomains": "📋 **עליך להשתמש במייל מאחד הדומיינים הבאים:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ לדוגמה `%VAR%`",
  "emailModalRolesAssigned": "🎭 **תפקידים שתקבל**",
  "codeModalTitle": "🔐 הזן קוד אימות",
  "codeModalHeader": "## כמעט שם!\nבדוק את תיבת הדואר הנכנס שלך לקוד האימות בן 6 הספרות.",
  "codeModalLabel": "קוד אימות",
  "codeModalPlaceholder": "הזן קוד בן 6 ספרות",
  "enterCodeButton": "הזן קוד",
  "codePromptTitle": "📬 הקוד נשלח!",
  "codePromptDescription": "קוד אימות נשלח אל:\n`%VAR%`\n\nלחץ על הכפתור למטה כדי להזין את הקוד שלך.",
  "codePromptTip": "💡 לא קיבלת?",
  "codePromptTipValue": "בדוק את תיקיית הספאם/זבל. המייל עשוי לקחת מספר דקות להגיע.",
  "mailInvalidTitle": "❌ מייל לא תקין",
  "mailInvalidDescription": "כתובת המייל שהזנת אינה תקינה.\n\nאנא ודא:\n• למייל יש פורמט נכון (שם@דומיין.com)\n• אתה משתמש בדומיין מייל מותר\n• אין רווחים בכתובת",
  "verificationSuccessTitle": "✅ האימות הושלם!",
  "verificationSuccessDescription": "ברוך הבא! אומתת בהצלחה.\n\n**תפקיד שהוקצה:** %VAR%\n**שרת:** %VAR%\n\nכעת יש לך גישה מלאה לשרת.",
  "invalidCodeTitle": "❌ קוד לא תקין",
  "invalidCodeDescription": "הקוד שהזנת שגוי.\n\n**מה לעשות:**\n• בדוק שוב את הקוד בן 6 הספרות מהמייל שלך\n• ודא שאתה משתמש בקוד העדכני ביותר\n• בקש קוד חדש אם צריך על ידי לחיצה שוב על כפתור האימות",
  "errorGenericTitle": "❌ אירעה שגיאה",
  "errorGenericDescription": "משהו השתבש בעת עיבוד הבקשה שלך. מנהל השרת קיבל התראה ויבדוק את זה.",
  "errorFieldGuild": "שרת",
  "errorFieldUser": "משתמש",
  "errorFallbackWarning": "⚠️ התראת גיבוי",
  "errorNotifyChannelFailed": "ערוץ השגיאות המוגדר כבר לא קיים או שהבוט לא יכול לשלוח הודעות שם. השגיאה נשלחה לבעלים במקום. אנא הגדר מחדש עם `/set_error_notify`.",
  "errorNotifyUserFailed": "המשתמש המוגדר להתראות כבר לא בשרת או שיש לו DMs מושבתים. השגיאה נשלחה לבעלים במקום. אנא הגדר מחדש עם `/set_error_notify`.",
  "errorNotifySetOwner": "✅ התראות שגיאה יישלחו כעת לבעלי השרת ב-DM.",
  "errorNotifySetChannel": "✅ התראות שגיאה יישלחו כעת ל-#%VAR%.",
  "errorNotifySetUser": "✅ התראות שגיאה יישלחו כעת ל-%VAR% ב-DM.",
  "errorNotifyInvalidChannel": "❌ אנא בחר ערוץ טקסט להתראות שגיאה.",
  "errorNotifyUserNotInGuild": "❌ המשתמש שנבחר אינו חבר בשרת זה.",
  "errorNotifyStatusTitle": "📋 הגדרות התראות שגיאה",
  "errorNotifyStatusOwner": "התראות שגיאה נשלחות ל**בעלי השרת** (%VAR%) ב-DM.",
  "errorNotifyStatusChannel": "התראות שגיאה נשלחות ל**#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ התראות מוגדרות לערוץ שכבר לא קיים. ישתמש בבעלי השרת.",
  "errorNotifyStatusUser": "התראות שגיאה נשלחות ל**%VAR%** ב-DM.",
  "errorNotifyStatusUserInvalid": "⚠️ התראות מוגדרות למשתמש שכבר לא בשרת. ישתמש בבעלי השרת.",
  "errorNotifyStatusNote": "ℹ️ הערה",
  "errorNotifyStatusNoteValue": "אם שיטת ההתראה המוגדרת נכשלת, שגיאות יישלחו אוטומטית לבעלי השרת.",
  "errorRoleAssignTitle": "שגיאת הקצאת תפקיד",
  "errorRoleAssignMessage": "נכשל בהקצאת תפקיד מאומת/לא מאומת למשתמש. אנא ודא:\n• תפקיד הבוט גבוה יותר מתפקידי מאומת/לא מאומת\n• התפקידים עדיין קיימים\n• לבוט יש הרשאת 'ניהול תפקידים'\n\n💡 **טיפ:** העבר את תפקיד EmailBot מעל תפקידי מאומת/לא מאומת בהגדרות שרת → תפקידים, או הקצה את התפקיד מאומת/לא מאומת ישירות לבוט.\n[צפה בדוגמה](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "הבוט לא מוגדר",
  "errorBotNotConfiguredMessage": "משתמש ניסה לאמת אבל הבוט לא מוגדר כראוי.\n\n**הגדרה נדרשת:**\n• הגדר דומיינים מותרים עם `/domain add`\n• הגדר תפקיד מאומת עם `/role verified`\n\nהרץ `/status` כדי לבדוק את ההגדרה הנוכחית."
}

```

# language\korean.json

```json
{
  "mailPositive": "%VAR%로 전송된 코드를 입력해주세요 (코드를 받지 못했다면 스팸 메일함을 확인해주세요).",
  "mailFailedTitle": "❌ 이메일 전송 실패",
  "mailFailedDescription": "다음 주소로 인증 이메일을 보내지 못했습니다:\n`%VAR%`\n\n**가능한 이유:**\n• 이메일 주소가 존재하지 않음\n• 이메일 서버가 메시지를 거부함\n• 일시적인 전송 문제\n\n이메일 주소를 다시 확인하고 재시도해주세요.",
  "roleAdded": "%VAR% 역할을 지급하였습니다",
  "mailInvalid": "유효한 이메일 주소를 입력해주세요",
  "mailBlacklistedTitle": "🚫 이메일 차단됨",
  "mailBlacklistedDescription": "입력한 이메일 주소가 서버 관리자에 의해 차단되었습니다.\n\n이유:\n• 이메일 도메인이 허용되지 않음\n• 특정 이메일이 차단됨\n\n오류라고 생각되면 서버 관리자에게 문의하세요.",
  "mailTimeoutTitle": "⏳ 잠시 기다려주세요",
  "mailTimeoutDescription": "이메일을 너무 빨리 보내고 있습니다.\n\n다음 인증 코드를 요청하기 전에 **%VAR%초** 기다려주세요.\n\n이 제한은 스팸을 방지하고 안정적인 이메일 전송을 보장합니다.",
  "invalidPermissions": "해당 명령어를 실행할 권한이 없습니다!",
  "commandFailed": "해당 명령어 실행 중 오류가 발생하였습니다!",
  "userRetry": "오류가 발생하였습니다. 감정표현을 취소했다가 다시 눌러서 재시도해주세요.",
  "userBotError": "봇이 정상적으로 구성되지 않았습니다. 어드민에게 문의해주세요!",
  "userEnterEmail": "인증할 이메일 주소를 입력해주세요 %VAR%.",
  "userCantFindRole": "역할을 찾을 수 없습니다. 어드민에게 문의해주세요! 팁: 역할의 이름이 동일하고 서버 설정>역할 메뉴에서 봇의 역할이 인증된 역할과 미인증된 역할보다 위에 있는지 확인해주세요.",
  "emailSubject": "확인 알림",
  "emailSenderName": "확인",
  "emailText": "안녕하세요,\n\n서버에 대한 자동 확인 메시지입니다:\n\n%VAR%\n\n귀하의 코드:\n\n%VAR%\n\n이 메시지를 예상하지 않았다면 무시해도 됩니다.",
  "verifyEmbedTitle": "✉️ 이메일 인증",
  "verifyEmbedInstructions": "아래 버튼을 클릭하여 인증 프로세스를 시작하세요. 이메일로 코드를 받게 됩니다.\n\n이미 코드가 있나요? **코드 입력** 버튼을 사용하세요.",
  "verifyEmbedFooter": "인증 시스템",
  "verifyDmDescription": "**%VAR%**에 오신 것을 환영합니다! 아래 버튼을 클릭하여 이메일 주소를 인증하고 서버에 액세스하세요.",
  "verifyDmButton": "인증 시작",
  "verifyDmAdminWarning": "참고: 서버 관리자는 사용하는 이메일 주소를 볼 수 있습니다",
  "buttonCreated": "✅ 인증 버튼이 성공적으로 생성되었습니다!",
  "emailModalTitle": "📧 이메일 인증",
  "emailModalHeader": "## 신원 확인\n인증 코드를 받으려면 아래에 이메일 주소를 입력하세요.",
  "emailModalLabel": "이메일 주소",
  "emailModalPlaceholder": "이름@",
  "emailModalAdminWarning": "\n\n⚠️ **참고:** 서버 관리자는 사용하는 이메일 주소를 볼 수 있습니다.",
  "emailModalAllDomainsAccepted": "✅ 모든 이메일 주소가 허용됩니다",
  "emailModalAcceptedDomains": "📋 **다음 도메인 중 하나의 이메일을 사용해야 합니다:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ 예: `%VAR%`",
  "emailModalRolesAssigned": "🎭 **받게 될 역할**",
  "codeModalTitle": "🔐 인증 코드 입력",
  "codeModalHeader": "## 거의 다 됐습니다!\n받은 편지함에서 6자리 인증 코드를 확인하세요.",
  "codeModalLabel": "인증 코드",
  "codeModalPlaceholder": "6자리 코드 입력",
  "enterCodeButton": "코드 입력",
  "codePromptTitle": "📬 코드 전송됨!",
  "codePromptDescription": "인증 코드가 다음으로 전송되었습니다:\n`%VAR%`\n\n아래 버튼을 클릭하여 코드를 입력하세요.",
  "codePromptTip": "💡 받지 못했나요?",
  "codePromptTipValue": "스팸/정크 폴더를 확인하세요. 이메일이 도착하는 데 몇 분이 걸릴 수 있습니다.",
  "mailInvalidTitle": "❌ 잘못된 이메일",
  "mailInvalidDescription": "입력한 이메일 주소가 유효하지 않습니다.\n\n확인하세요:\n• 이메일 형식이 올바른지 (이름@도메인.com)\n• 허용된 이메일 도메인을 사용하는지\n• 주소에 공백이 없는지",
  "verificationSuccessTitle": "✅ 인증 완료!",
  "verificationSuccessDescription": "환영합니다! 성공적으로 인증되었습니다.\n\n**할당된 역할:** %VAR%\n**서버:** %VAR%\n\n이제 서버에 대한 전체 액세스 권한이 있습니다.",
  "invalidCodeTitle": "❌ 잘못된 코드",
  "invalidCodeDescription": "입력한 코드가 올바르지 않습니다.\n\n**해결 방법:**\n• 이메일의 6자리 코드를 다시 확인하세요\n• 가장 최근 코드를 사용하고 있는지 확인하세요\n• 필요한 경우 인증 버튼을 다시 클릭하여 새 코드를 요청하세요",
  "errorGenericTitle": "❌ 오류가 발생했습니다",
  "errorGenericDescription": "요청을 처리하는 동안 문제가 발생했습니다. 서버 관리자에게 알림이 전송되었으며 확인할 예정입니다.",
  "errorFieldGuild": "서버",
  "errorFieldUser": "사용자",
  "errorFallbackWarning": "⚠️ 알림 대체",
  "errorNotifyChannelFailed": "설정된 오류 채널이 더 이상 존재하지 않거나 봇이 메시지를 보낼 수 없습니다. 오류가 소유자에게 대신 전송되었습니다. `/set_error_notify`로 다시 설정해주세요.",
  "errorNotifyUserFailed": "오류 알림용으로 설정된 사용자가 더 이상 서버에 없거나 DM을 비활성화했습니다. 오류가 소유자에게 대신 전송되었습니다. `/set_error_notify`로 다시 설정해주세요.",
  "errorNotifySetOwner": "✅ 오류 알림이 이제 서버 소유자에게 DM으로 전송됩니다.",
  "errorNotifySetChannel": "✅ 오류 알림이 이제 #%VAR%로 전송됩니다.",
  "errorNotifySetUser": "✅ 오류 알림이 이제 %VAR%에게 DM으로 전송됩니다.",
  "errorNotifyInvalidChannel": "❌ 오류 알림을 위한 텍스트 채널을 선택해주세요.",
  "errorNotifyUserNotInGuild": "❌ 선택한 사용자는 이 서버의 멤버가 아닙니다.",
  "errorNotifyStatusTitle": "📋 오류 알림 설정",
  "errorNotifyStatusOwner": "오류 알림이 **서버 소유자** (%VAR%)에게 DM으로 전송됩니다.",
  "errorNotifyStatusChannel": "오류 알림이 **#%VAR%**로 전송됩니다.",
  "errorNotifyStatusChannelInvalid": "⚠️ 알림이 더 이상 존재하지 않는 채널로 설정되어 있습니다. 서버 소유자에게 대체됩니다.",
  "errorNotifyStatusUser": "오류 알림이 **%VAR%**에게 DM으로 전송됩니다.",
  "errorNotifyStatusUserInvalid": "⚠️ 알림이 더 이상 서버에 없는 사용자로 설정되어 있습니다. 서버 소유자에게 대체됩니다.",
  "errorNotifyStatusNote": "ℹ️ 참고",
  "errorNotifyStatusNoteValue": "설정된 알림 방법이 실패하면 오류가 자동으로 서버 소유자에게 전송됩니다.",
  "errorRoleAssignTitle": "역할 할당 오류",
  "errorRoleAssignMessage": "사용자에게 인증/미인증 역할을 할당하지 못했습니다. 확인해주세요:\n• 봇의 역할이 인증/미인증 역할보다 높은지\n• 역할이 여전히 존재하는지\n• 봇에 '역할 관리' 권한이 있는지\n\n💡 **팁:** 서버 설정 → 역할에서 EmailBot 역할을 인증/미인증 역할 위로 이동하거나, 인증/미인증 역할을 봇에 직접 할당하세요.\n[예시 보기](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "봇 미설정",
  "errorBotNotConfiguredMessage": "사용자가 인증을 시도했지만 봇이 올바르게 구성되지 않았습니다.\n\n**필요한 설정:**\n• `/domain add`로 허용된 이메일 도메인 설정\n• `/role verified`로 인증된 역할 설정\n\n`/status`를 실행하여 현재 구성을 확인하세요."
}

```

# language\polish.json

```json
{
  "mailPositive": "Wprowadź kod otrzymany na adres %VAR% (Sprawdź folder spam, jeśli nie otrzymałeś kodu).",
  "mailFailedTitle": "❌ Błąd Wysyłki Email",
  "mailFailedDescription": "Nie mogliśmy wysłać emaila weryfikacyjnego na:\n`%VAR%`\n\n**Możliwe przyczyny:**\n• Adres email nie istnieje\n• Serwer email odrzucił wiadomość\n• Występuje tymczasowy problem z dostawą\n\nSprawdź swój adres email i spróbuj ponownie.",
  "roleAdded": "Dodano rolę %VAR%",
  "mailInvalid": "Wprowadź tylko prawidłowy adres email",
  "mailBlacklistedTitle": "🚫 Email Zablokowany",
  "mailBlacklistedDescription": "Wprowadzony adres email został zablokowany przez administratora serwera.\n\nMoże to być spowodowane:\n• Domena email nie jest dozwolona\n• Konkretny email został zbanowany\n\nJeśli uważasz, że to błąd, skontaktuj się z administratorem serwera.",
  "mailTimeoutTitle": "⏳ Proszę Czekać",
  "mailTimeoutDescription": "Wysyłasz emaile zbyt szybko.\n\nPoczekaj **%VAR% sekund** przed wysłaniem kolejnego kodu weryfikacyjnego.\n\nTen limit pomaga zapobiegać spamowi i zapewnia niezawodną dostawę emaili.",
  "invalidPermissions": "Nie masz uprawnień do wykonania tej komendy!",
  "commandFailed": "Podczas wykonywania komendy wystąpił błąd!",
  "userRetry": "Wystąpił błąd. Usuń i dodaj reakcję by spróbować ponownie.",
  "userBotError": "Bot nie został poprawnie skonfigurowany. Skontaktuj się z administratorem!",
  "userEnterEmail": "Wprowadź swój adres email by zweryfikować %VAR%.",
  "userCantFindRole": "Nie odnaleziono ról. Skontaktuj się z administratorem! Wskazówka: Upewnij się, że nazwa roli jest wciąż taka sama i rola bota jest wyżej w ustawieniach serwera niż rola zweryfikowana i niezweryfkowana.",
  "emailSubject": "Powiadomienie o potwierdzeniu",
  "emailSenderName": "Potwierdzenie",
  "emailText": "Cześć,\n\nTo jest automatyczna wiadomość potwierdzająca dla serwera:\n\n%VAR%\n\nTwój kod:\n\n%VAR%\n\nJeśli nie spodziewałeś się tej wiadomości, możesz ją zignorować.",
  "verifyEmbedTitle": "✉️ Weryfikacja Email",
  "verifyEmbedInstructions": "Kliknij przycisk poniżej, aby rozpocząć proces weryfikacji. Otrzymasz kod emailem.\n\nMasz już kod? Użyj przycisku **Wprowadź Kod**.",
  "verifyEmbedFooter": "System Weryfikacji",
  "verifyDmDescription": "Witamy w **%VAR%**! Kliknij przycisk poniżej, aby zweryfikować swój adres email i uzyskać dostęp do serwera.",
  "verifyDmButton": "Rozpocznij Weryfikację",
  "verifyDmAdminWarning": "Uwaga: Administrator serwera może zobaczyć używany adres email",
  "buttonCreated": "✅ Przycisk weryfikacji utworzony pomyślnie!",
  "emailModalTitle": "📧 Weryfikacja Email",
  "emailModalHeader": "## Zweryfikuj Swoją Tożsamość\nWprowadź poniżej swój adres email, aby otrzymać kod weryfikacyjny.",
  "emailModalLabel": "Adres Email",
  "emailModalPlaceholder": "twoje.imie@",
  "emailModalAdminWarning": "\n\n⚠️ **Uwaga:** Administrator serwera może zobaczyć używany adres email.",
  "emailModalAllDomainsAccepted": "✅ Akceptowany jest każdy adres email",
  "emailModalAcceptedDomains": "📋 **Musisz użyć emaila z jednej z tych domen:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ np. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Role, które otrzymasz**",
  "codeModalTitle": "🔐 Wprowadź Kod Weryfikacyjny",
  "codeModalHeader": "## Prawie Gotowe!\nSprawdź swoją skrzynkę odbiorczą w poszukiwaniu 6-cyfrowego kodu weryfikacyjnego.",
  "codeModalLabel": "Kod Weryfikacyjny",
  "codeModalPlaceholder": "Wprowadź 6-cyfrowy kod",
  "enterCodeButton": "Wprowadź Kod",
  "codePromptTitle": "📬 Kod Wysłany!",
  "codePromptDescription": "Kod weryfikacyjny został wysłany na:\n`%VAR%`\n\nKliknij przycisk poniżej, aby wprowadzić swój kod.",
  "codePromptTip": "💡 Nie otrzymałeś?",
  "codePromptTipValue": "Sprawdź folder spam/śmieci. Email może przyjść za kilka minut.",
  "mailInvalidTitle": "❌ Nieprawidłowy Email",
  "mailInvalidDescription": "Wprowadzony adres email jest nieprawidłowy.\n\nUpewnij się, że:\n• Email ma poprawny format (nazwa@domena.com)\n• Używasz dozwolonej domeny email\n• W adresie nie ma spacji",
  "verificationSuccessTitle": "✅ Weryfikacja Zakończona!",
  "verificationSuccessDescription": "Witamy! Zostałeś pomyślnie zweryfikowany.\n\n**Przypisana rola:** %VAR%\n**Serwer:** %VAR%\n\nMasz teraz pełny dostęp do serwera.",
  "invalidCodeTitle": "❌ Nieprawidłowy Kod",
  "invalidCodeDescription": "Wprowadzony kod jest nieprawidłowy.\n\n**Co zrobić:**\n• Sprawdź 6-cyfrowy kod z emaila\n• Upewnij się, że używasz najnowszego kodu\n• W razie potrzeby poproś o nowy kod, klikając ponownie przycisk weryfikacji",
  "errorGenericTitle": "❌ Wystąpił Błąd",
  "errorGenericDescription": "Coś poszło nie tak podczas przetwarzania Twojego żądania. Administrator serwera został powiadomiony i zajmie się tym.",
  "errorFieldGuild": "Serwer",
  "errorFieldUser": "Użytkownik",
  "errorFallbackWarning": "⚠️ Powiadomienie Awaryjne",
  "errorNotifyChannelFailed": "Skonfigurowany kanał błędów już nie istnieje lub bot nie może tam wysyłać wiadomości. Błąd został wysłany do właściciela. Skonfiguruj ponownie używając `/set_error_notify`.",
  "errorNotifyUserFailed": "Skonfigurowany użytkownik do powiadomień nie jest już na serwerze lub ma wyłączone DM. Błąd został wysłany do właściciela. Skonfiguruj ponownie używając `/set_error_notify`.",
  "errorNotifySetOwner": "✅ Powiadomienia o błędach będą teraz wysyłane do właściciela serwera przez DM.",
  "errorNotifySetChannel": "✅ Powiadomienia o błędach będą teraz wysyłane na #%VAR%.",
  "errorNotifySetUser": "✅ Powiadomienia o błędach będą teraz wysyłane do %VAR% przez DM.",
  "errorNotifyInvalidChannel": "❌ Wybierz kanał tekstowy dla powiadomień o błędach.",
  "errorNotifyUserNotInGuild": "❌ Wybrany użytkownik nie jest członkiem tego serwera.",
  "errorNotifyStatusTitle": "📋 Ustawienia Powiadomień o Błędach",
  "errorNotifyStatusOwner": "Powiadomienia o błędach są wysyłane do **właściciela serwera** (%VAR%) przez DM.",
  "errorNotifyStatusChannel": "Powiadomienia o błędach są wysyłane na **#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ Powiadomienia są skonfigurowane dla kanału, który już nie istnieje. Zostanie użyty właściciel serwera.",
  "errorNotifyStatusUser": "Powiadomienia o błędach są wysyłane do **%VAR%** przez DM.",
  "errorNotifyStatusUserInvalid": "⚠️ Powiadomienia są skonfigurowane dla użytkownika, który nie jest już na serwerze. Zostanie użyty właściciel serwera.",
  "errorNotifyStatusNote": "ℹ️ Uwaga",
  "errorNotifyStatusNoteValue": "Jeśli skonfigurowana metoda powiadomień zawiedzie, błędy zostaną automatycznie wysłane do właściciela serwera.",
  "errorRoleAssignTitle": "Błąd Przypisania Roli",
  "errorRoleAssignMessage": "Nie udało się przypisać roli zweryfikowany/niezweryfikowany do użytkownika. Upewnij się, że:\n• Rola bota jest wyżej niż role zweryfikowany/niezweryfikowany\n• Role nadal istnieją\n• Bot ma uprawnienie 'Zarządzaj Rolami'\n\n💡 **Wskazówka:** Przenieś rolę EmailBot powyżej ról zweryfikowany/niezweryfikowany w Ustawienia serwera → Role, lub przypisz rolę zweryfikowany/niezweryfikowany bezpośrednio do bota.\n[Zobacz przykład](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot Nie Skonfigurowany",
  "errorBotNotConfiguredMessage": "Użytkownik próbował się zweryfikować, ale bot nie jest poprawnie skonfigurowany.\n\n**Wymagana konfiguracja:**\n• Ustaw dozwolone domeny email za pomocą `/domain add`\n• Ustaw rolę zweryfikowanego za pomocą `/role verified`\n\nUruchom `/status` aby sprawdzić aktualną konfigurację."
}

```

# language\spanish.json

```json
{
  "mailPositive": "Por favor, ingrese el código que recibió en %VAR% (Compruebe la carpeta de spam si no recibe un código).",
  "mailFailedTitle": "❌ Error de Envío de Email",
  "mailFailedDescription": "No pudimos enviar el email de verificación a:\n`%VAR%`\n\n**Posibles razones:**\n• La dirección de email no existe\n• El servidor de email rechazó el mensaje\n• Hay un problema temporal de envío\n\nPor favor, verifica tu dirección de email e intenta nuevamente.",
  "roleAdded": "Se agregó el rol %VAR%",
  "mailInvalid": "Por favor ingrese solo direcciones de correo electrónico válidas",
  "mailBlacklistedTitle": "🚫 Email Bloqueado",
  "mailBlacklistedDescription": "La dirección de email que ingresaste ha sido bloqueada por el administrador del servidor.\n\nEsto podría ser porque:\n• El dominio de email no está permitido\n• El email específico ha sido baneado\n\nSi crees que esto es un error, por favor contacta a un administrador del servidor.",
  "mailTimeoutTitle": "⏳ Por Favor Espera",
  "mailTimeoutDescription": "Estás enviando emails demasiado rápido.\n\nPor favor espera **%VAR% segundos** antes de solicitar otro código de verificación.\n\nEste límite ayuda a prevenir spam y asegura una entrega confiable de emails.",
  "invalidPermissions": "¡No tienes permiso para ejecutar este comando!",
  "commandFailed": "¡Hubo un error al ejecutar este comando!",
  "userRetry": "Se produjo un error. Elimine y agregue la reacción para volver a intentarlo.",
  "userBotError": "El bot no está configurado correctamente. ¡Comuníquese con el administrador!",
  "userEnterEmail": "Por favor ingrese su dirección de correo electrónico para verificar %VAR%.",
  "userCantFindRole": "No puedo encontrar roles. ¡Por favor, comuníquese con el administrador! Ayuda: Asegúrese de que el nombre siga siendo el mismo y que el rol del bot sea más alto en el menú de roles de configuración del servidor que el rol verificado y no verificado",
  "emailSubject": "Aviso de confirmación",
  "emailSenderName": "Confirmación",
  "emailText": "Hola,\n\nEste es un mensaje de confirmación automático para el servidor:\n\n%VAR%\n\nTu código:\n\n%VAR%\n\nSi no esperabas este mensaje, puedes ignorarlo.",
  "verifyEmbedTitle": "✉️ Verificación de Email",
  "verifyEmbedInstructions": "Haz clic en el botón de abajo para iniciar el proceso de verificación. Recibirás un código por email.\n\n¿Ya tienes un código? Usa el botón **Ingresar Código**.",
  "verifyEmbedFooter": "Sistema de Verificación",
  "verifyDmDescription": "¡Bienvenido a **%VAR%**! Haz clic en el botón de abajo para verificar tu dirección de email y obtener acceso al servidor.",
  "verifyDmButton": "Iniciar Verificación",
  "verifyDmAdminWarning": "Nota: El administrador del servidor puede ver la dirección de email que uses",
  "buttonCreated": "✅ ¡Botón de verificación creado exitosamente!",
  "emailModalTitle": "📧 Verificación de Email",
  "emailModalHeader": "## Verifica Tu Identidad\nIngresa tu dirección de email abajo para recibir un código de verificación.",
  "emailModalLabel": "Dirección de Email",
  "emailModalPlaceholder": "tu.nombre@",
  "emailModalAdminWarning": "\n\n⚠️ **Nota:** El administrador del servidor puede ver la dirección de email que uses.",
  "emailModalAllDomainsAccepted": "✅ Se acepta cualquier dirección de email",
  "emailModalAcceptedDomains": "📋 **Debes usar un email de uno de estos dominios:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ ej. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Roles que recibirás**",
  "codeModalTitle": "🔐 Ingresa el Código de Verificación",
  "codeModalHeader": "## ¡Casi Listo!\nRevisa tu bandeja de entrada para el código de verificación de 6 dígitos.",
  "codeModalLabel": "Código de Verificación",
  "codeModalPlaceholder": "Ingresa el código de 6 dígitos",
  "enterCodeButton": "Ingresar Código",
  "codePromptTitle": "📬 ¡Código Enviado!",
  "codePromptDescription": "Se ha enviado un código de verificación a:\n`%VAR%`\n\nHaz clic en el botón de abajo para ingresar tu código.",
  "codePromptTip": "💡 ¿No lo recibiste?",
  "codePromptTipValue": "Revisa tu carpeta de spam/correo no deseado. El email puede tardar unos minutos en llegar.",
  "mailInvalidTitle": "❌ Email Inválido",
  "mailInvalidDescription": "La dirección de email que ingresaste no es válida.\n\nAsegúrate de que:\n• El email tenga el formato correcto (nombre@dominio.com)\n• Estés usando un dominio de email permitido\n• No haya espacios en la dirección",
  "verificationSuccessTitle": "✅ ¡Verificación Completa!",
  "verificationSuccessDescription": "¡Bienvenido! Has sido verificado exitosamente.\n\n**Rol asignado:** %VAR%\n**Servidor:** %VAR%\n\nAhora tienes acceso completo al servidor.",
  "invalidCodeTitle": "❌ Código Inválido",
  "invalidCodeDescription": "El código que ingresaste es incorrecto.\n\n**Qué hacer:**\n• Verifica el código de 6 dígitos de tu email\n• Asegúrate de estar usando el código más reciente\n• Solicita un nuevo código si es necesario haciendo clic en el botón de verificación nuevamente",
  "errorGenericTitle": "❌ Ocurrió un Error",
  "errorGenericDescription": "Algo salió mal al procesar tu solicitud. El administrador del servidor ha sido notificado y lo revisará.",
  "errorFieldGuild": "Servidor",
  "errorFieldUser": "Usuario",
  "errorFallbackWarning": "⚠️ Notificación de Respaldo",
  "errorNotifyChannelFailed": "El canal de errores configurado ya no existe o el bot no puede enviar mensajes allí. El error se envió al propietario. Por favor reconfigure usando `/set_error_notify`.",
  "errorNotifyUserFailed": "El usuario configurado para notificaciones ya no está en el servidor o tiene los DMs desactivados. El error se envió al propietario. Por favor reconfigure usando `/set_error_notify`.",
  "errorNotifySetOwner": "✅ Las notificaciones de error ahora se enviarán al propietario del servidor por DM.",
  "errorNotifySetChannel": "✅ Las notificaciones de error ahora se enviarán a #%VAR%.",
  "errorNotifySetUser": "✅ Las notificaciones de error ahora se enviarán a %VAR% por DM.",
  "errorNotifyInvalidChannel": "❌ Por favor seleccione un canal de texto para las notificaciones de error.",
  "errorNotifyUserNotInGuild": "❌ El usuario seleccionado no es miembro de este servidor.",
  "errorNotifyStatusTitle": "📋 Configuración de Notificaciones de Error",
  "errorNotifyStatusOwner": "Las notificaciones de error se envían al **propietario del servidor** (%VAR%) por DM.",
  "errorNotifyStatusChannel": "Las notificaciones de error se envían a **#%VAR%**.",
  "errorNotifyStatusChannelInvalid": "⚠️ Las notificaciones están configuradas para un canal que ya no existe. Se usará el propietario del servidor.",
  "errorNotifyStatusUser": "Las notificaciones de error se envían a **%VAR%** por DM.",
  "errorNotifyStatusUserInvalid": "⚠️ Las notificaciones están configuradas para un usuario que ya no está en el servidor. Se usará el propietario del servidor.",
  "errorNotifyStatusNote": "ℹ️ Nota",
  "errorNotifyStatusNoteValue": "Si el método de notificación configurado falla, los errores se enviarán automáticamente al propietario del servidor.",
  "errorRoleAssignTitle": "Error de Asignación de Rol",
  "errorRoleAssignMessage": "No se pudo asignar el rol verificado/no verificado a un usuario. Por favor asegúrese de:\n• El rol del bot está más alto que los roles verificado/no verificado\n• Los roles todavía existen\n• El bot tiene el permiso 'Gestionar Roles'\n\n💡 **Consejo:** Mueva el rol de EmailBot por encima de los roles verificado/no verificado en Configuración del servidor → Roles, o asigne el rol verificado/no verificado directamente al bot.\n[Ver ejemplo](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot No Configurado",
  "errorBotNotConfiguredMessage": "Un usuario intentó verificarse pero el bot no está configurado correctamente.\n\n**Configuración requerida:**\n• Establecer dominios de email permitidos con `/domain add`\n• Establecer rol verificado con `/role verified`\n\nEjecute `/status` para verificar la configuración actual."
}

```

# language\thai.json

```json
{
  "mailPositive": "กรุณากรอกโค้ดที่คุณได้รับที่ %VAR% (กรุณาตรวจสอบโฟลเดอร์สแปมหากคุณไม่ได้รับโค้ด)",
  "mailFailedTitle": "❌ การส่งอีเมลล้มเหลว",
  "mailFailedDescription": "ไม่สามารถส่งอีเมลยืนยันไปยัง:\n`%VAR%`\n\n**สาเหตุที่เป็นไปได้:**\n• ที่อยู่อีเมลไม่มีอยู่\n• เซิร์ฟเวอร์อีเมลปฏิเสธข้อความ\n• มีปัญหาการส่งชั่วคราว\n\nกรุณาตรวจสอบที่อยู่อีเมลของคุณและลองอีกครั้ง",
  "roleAdded": "เพิ่มบทบาท %VAR% เรียบร้อยแล้ว",
  "mailInvalid": "กรุณาใส่ที่อยู่อีเมลที่ถูกต้องเท่านั้น",
  "mailBlacklistedTitle": "🚫 อีเมลถูกบล็อก",
  "mailBlacklistedDescription": "ที่อยู่อีเมลที่คุณกรอกถูกบล็อกโดยผู้ดูแลเซิร์ฟเวอร์\n\nอาจเป็นเพราะ:\n• โดเมนอีเมลไม่ได้รับอนุญาต\n• อีเมลนี้ถูกแบน\n\nหากคุณเชื่อว่านี่เป็นข้อผิดพลาด กรุณาติดต่อผู้ดูแลเซิร์ฟเวอร์",
  "mailTimeoutTitle": "⏳ กรุณารอสักครู่",
  "mailTimeoutDescription": "คุณกำลังส่งอีเมลเร็วเกินไป\n\nกรุณารอ **%VAR% วินาที** ก่อนขอรหัสยืนยันอีกครั้ง\n\nข้อจำกัดนี้ช่วยป้องกันสแปมและรับประกันการส่งอีเมลที่เชื่อถือได้",
  "invalidPermissions": "คุณไม่มีสิทธิ์ใช้คำสั่งนี้!",
  "commandFailed": "เกิดข้อผิดพลาดระหว่างการใช้งานคำสั่งนี้!",
  "userRetry": "เกิดข้อผิดพลาด กรุณาลบรีแอคชั่นแล้วเพิ่มใหม่เพื่อลองอีกครั้ง",
  "userBotError": "บอทไม่ได้ถูกตั้งค่าอย่างถูกต้อง โปรดติดต่อผู้ดูแลระบบ!",
  "userEnterEmail": "กรุณาใส่อีเมลของคุณเพื่อยืนยัน %VAR%",
  "userCantFindRole": "ไม่พบบทบาท โปรดติดต่อผู้ดูแลระบบ! แนะนำ: ตรวจสอบให้แน่ใจว่าชื่อบทบาทยังเหมือนเดิม และบทบาทของบอทอยู่สูงกว่า Verified และ Unverified ในเมนูตั้งค่าบทบาทของเซิร์ฟเวอร์",
  "emailSubject": "การแจ้งเตือนการยืนยัน",
  "emailSenderName": "การยืนยัน",
  "emailText": "สวัสดี,\n\nนี่คือข้อความยืนยันอัตโนมัติสำหรับเซิร์ฟเวอร์:\n\n%VAR%\n\nรหัสของคุณ:\n\n%VAR%\n\nหากคุณไม่ได้คาดหวังข้อความนี้ คุณสามารถเพิกเฉยได้",
  "verifyEmbedTitle": "✉️ การยืนยันอีเมล",
  "verifyEmbedInstructions": "คลิกปุ่มด้านล่างเพื่อเริ่มกระบวนการยืนยัน คุณจะได้รับรหัสทางอีเมล\n\nมีรหัสแล้ว? ใช้ปุ่ม **กรอกรหัส**",
  "verifyEmbedFooter": "ระบบยืนยันตัวตน",
  "verifyDmDescription": "ยินดีต้อนรับสู่ **%VAR%**! คลิกปุ่มด้านล่างเพื่อยืนยันที่อยู่อีเมลของคุณและเข้าถึงเซิร์ฟเวอร์",
  "verifyDmButton": "เริ่มการยืนยัน",
  "verifyDmAdminWarning": "หมายเหตุ: ผู้ดูแลเซิร์ฟเวอร์สามารถเห็นที่อยู่อีเมลที่คุณใช้",
  "buttonCreated": "✅ สร้างปุ่มยืนยันเรียบร้อยแล้ว!",
  "emailModalTitle": "📧 การยืนยันอีเมล",
  "emailModalHeader": "## ยืนยันตัวตนของคุณ\nกรอกที่อยู่อีเมลด้านล่างเพื่อรับรหัสยืนยัน",
  "emailModalLabel": "ที่อยู่อีเมล",
  "emailModalPlaceholder": "ชื่อของคุณ@",
  "emailModalAdminWarning": "\n\n⚠️ **หมายเหตุ:** ผู้ดูแลเซิร์ฟเวอร์สามารถเห็นที่อยู่อีเมลที่คุณใช้",
  "emailModalAllDomainsAccepted": "✅ รับที่อยู่อีเมลทุกประเภท",
  "emailModalAcceptedDomains": "📋 **คุณต้องใช้อีเมลจากโดเมนใดโดเมนหนึ่งต่อไปนี้:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ เช่น `%VAR%`",
  "emailModalRolesAssigned": "🎭 **บทบาทที่คุณจะได้รับ**",
  "codeModalTitle": "🔐 กรอกรหัสยืนยัน",
  "codeModalHeader": "## เกือบเสร็จแล้ว!\nตรวจสอบกล่องจดหมายของคุณสำหรับรหัสยืนยัน 6 หลัก",
  "codeModalLabel": "รหัสยืนยัน",
  "codeModalPlaceholder": "กรอกรหัส 6 หลัก",
  "enterCodeButton": "กรอกรหัส",
  "codePromptTitle": "📬 ส่งรหัสแล้ว!",
  "codePromptDescription": "รหัสยืนยันถูกส่งไปที่:\n`%VAR%`\n\nคลิกปุ่มด้านล่างเพื่อกรอกรหัสของคุณ",
  "codePromptTip": "💡 ไม่ได้รับ?",
  "codePromptTipValue": "ตรวจสอบโฟลเดอร์สแปม/ขยะ อีเมลอาจใช้เวลาสักครู่ในการมาถึง",
  "mailInvalidTitle": "❌ อีเมลไม่ถูกต้อง",
  "mailInvalidDescription": "ที่อยู่อีเมลที่คุณกรอกไม่ถูกต้อง\n\nกรุณาตรวจสอบว่า:\n• อีเมลมีรูปแบบที่ถูกต้อง (ชื่อ@โดเมน.com)\n• คุณกำลังใช้โดเมนอีเมลที่อนุญาต\n• ไม่มีช่องว่างในที่อยู่",
  "verificationSuccessTitle": "✅ การยืนยันเสร็จสมบูรณ์!",
  "verificationSuccessDescription": "ยินดีต้อนรับ! คุณได้รับการยืนยันเรียบร้อยแล้ว\n\n**บทบาทที่ได้รับ:** %VAR%\n**เซิร์ฟเวอร์:** %VAR%\n\nตอนนี้คุณมีสิทธิ์เข้าถึงเซิร์ฟเวอร์อย่างเต็มที่",
  "invalidCodeTitle": "❌ รหัสไม่ถูกต้อง",
  "invalidCodeDescription": "รหัสที่คุณกรอกไม่ถูกต้อง\n\n**สิ่งที่ต้องทำ:**\n• ตรวจสอบรหัส 6 หลักจากอีเมลของคุณอีกครั้ง\n• ตรวจสอบให้แน่ใจว่าคุณใช้รหัสล่าสุด\n• ขอรหัสใหม่หากจำเป็นโดยคลิกปุ่มยืนยันอีกครั้ง",
  "errorGenericTitle": "❌ เกิดข้อผิดพลาด",
  "errorGenericDescription": "เกิดข้อผิดพลาดขณะประมวลผลคำขอของคุณ ผู้ดูแลเซิร์ฟเวอร์ได้รับแจ้งและจะตรวจสอบ",
  "errorFieldGuild": "เซิร์ฟเวอร์",
  "errorFieldUser": "ผู้ใช้",
  "errorFallbackWarning": "⚠️ การแจ้งเตือนสำรอง",
  "errorNotifyChannelFailed": "ช่องแจ้งข้อผิดพลาดที่กำหนดไว้ไม่มีอยู่แล้วหรือบอทไม่สามารถส่งข้อความได้ ข้อผิดพลาดถูกส่งไปยังเจ้าของแทน กรุณาตั้งค่าใหม่ด้วย `/set_error_notify`",
  "errorNotifyUserFailed": "ผู้ใช้ที่กำหนดไว้สำหรับการแจ้งเตือนไม่อยู่ในเซิร์ฟเวอร์แล้วหรือปิด DM ข้อผิดพลาดถูกส่งไปยังเจ้าของแทน กรุณาตั้งค่าใหม่ด้วย `/set_error_notify`",
  "errorNotifySetOwner": "✅ การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยังเจ้าของเซิร์ฟเวอร์ทาง DM",
  "errorNotifySetChannel": "✅ การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยัง #%VAR%",
  "errorNotifySetUser": "✅ การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยัง %VAR% ทาง DM",
  "errorNotifyInvalidChannel": "❌ กรุณาเลือกช่องข้อความสำหรับการแจ้งเตือนข้อผิดพลาด",
  "errorNotifyUserNotInGuild": "❌ ผู้ใช้ที่เลือกไม่ได้เป็นสมาชิกของเซิร์ฟเวอร์นี้",
  "errorNotifyStatusTitle": "📋 การตั้งค่าการแจ้งเตือนข้อผิดพลาด",
  "errorNotifyStatusOwner": "การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยัง **เจ้าของเซิร์ฟเวอร์** (%VAR%) ทาง DM",
  "errorNotifyStatusChannel": "การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยัง **#%VAR%**",
  "errorNotifyStatusChannelInvalid": "⚠️ การแจ้งเตือนถูกตั้งค่าสำหรับช่องที่ไม่มีอยู่แล้ว จะใช้เจ้าของเซิร์ฟเวอร์แทน",
  "errorNotifyStatusUser": "การแจ้งเตือนข้อผิดพลาดจะถูกส่งไปยัง **%VAR%** ทาง DM",
  "errorNotifyStatusUserInvalid": "⚠️ การแจ้งเตือนถูกตั้งค่าสำหรับผู้ใช้ที่ไม่อยู่ในเซิร์ฟเวอร์แล้ว จะใช้เจ้าของเซิร์ฟเวอร์แทน",
  "errorNotifyStatusNote": "ℹ️ หมายเหตุ",
  "errorNotifyStatusNoteValue": "หากวิธีการแจ้งเตือนที่กำหนดไว้ล้มเหลว ข้อผิดพลาดจะถูกส่งไปยังเจ้าของเซิร์ฟเวอร์โดยอัตโนมัติ",
  "errorRoleAssignTitle": "ข้อผิดพลาดการกำหนดบทบาท",
  "errorRoleAssignMessage": "ไม่สามารถกำหนดบทบาท verified/unverified ให้ผู้ใช้ได้ กรุณาตรวจสอบ:\n• บทบาทของบอทอยู่สูงกว่าบทบาท verified/unverified\n• บทบาทยังคงมีอยู่\n• บอทมีสิทธิ์ 'จัดการบทบาท'\n\n💡 **เคล็ดลับ:** ย้ายบทบาท EmailBot ให้อยู่เหนือบทบาท verified/unverified ในการตั้งค่าเซิร์ฟเวอร์ → บทบาท หรือกำหนดบทบาท verified/unverified ให้บอทโดยตรง\n[ดูตัวอย่าง](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "บอทไม่ได้ถูกตั้งค่า",
  "errorBotNotConfiguredMessage": "ผู้ใช้พยายามยืนยันตัวตนแต่บอทไม่ได้ถูกตั้งค่าอย่างถูกต้อง\n\n**การตั้งค่าที่ต้องการ:**\n• ตั้งค่าโดเมนอีเมลที่อนุญาตด้วย `/domain add`\n• ตั้งค่าบทบาท verified ด้วย `/role verified`\n\nรัน `/status` เพื่อตรวจสอบการตั้งค่าปัจจุบัน"
}

```

# language\turkish.json

```json
{
  "mailPositive": "Lütfen %VAR% mailine gönderilen kodu giriniz (Eğer elinize bir kod ulaşmadıysa spam klasörünü kontrol ediniz).",
  "mailFailedTitle": "❌ E-posta Gönderimi Başarısız",
  "mailFailedDescription": "Doğrulama e-postası şu adrese gönderilemedi:\n`%VAR%`\n\n**Olası nedenler:**\n• E-posta adresi mevcut değil\n• E-posta sunucusu mesajı reddetti\n• Geçici bir teslimat sorunu var\n\nLütfen e-posta adresinizi kontrol edin ve tekrar deneyin.",
  "roleAdded": "%VAR% rolü eklendi!",
  "mailInvalid": "Lütfen yalnızca geçerli e-posta adreslerini giriniz",
  "mailBlacklistedTitle": "🚫 E-posta Engellendi",
  "mailBlacklistedDescription": "Girdiğiniz e-posta adresi sunucu yöneticisi tarafından engellenmiş.\n\nBu şunlardan kaynaklanıyor olabilir:\n• E-posta domaini izin verilmiyor\n• Belirli e-posta yasaklanmış\n\nBunun bir hata olduğunu düşünüyorsanız, lütfen sunucu yöneticisiyle iletişime geçin.",
  "mailTimeoutTitle": "⏳ Lütfen Bekleyin",
  "mailTimeoutDescription": "E-postaları çok hızlı gönderiyorsunuz.\n\nBaşka bir doğrulama kodu istemeden önce lütfen **%VAR% saniye** bekleyin.\n\nBu sınır spam'i önlemeye ve güvenilir e-posta teslimatını sağlamaya yardımcı olur.",
  "invalidPermissions": "Bu komutu çalıştırma izniniz yok!",
  "commandFailed": "Komutu çalıştırırken bir hata meydana geldi!",
  "userRetry": "Bir hata meydana geldi. Tekrar denemek için lütfen reaksiyonu kaldırıp tekrar ekleyiniz.",
  "userBotError": "Bot düzgün bir şekilde ayarlanmamış. Lütfen bir admine ulaşınız!",
  "userEnterEmail": "Hesabınızı doğrulamak için lütfen email adresinizi giriniz %VAR%.",
  "userCantFindRole": "Rolleri bulamıyorum. Lütfen adminle iletişime geçin! Yardım: Rol adının hala aynı olduğundan ve sunucu ayarları rol menüsünde bot rolünün doğrulanmış ve doğrulanmamış rolden daha yüksek olduğundan emin olun.",
  "emailSubject": "Onay bildirimi",
  "emailSenderName": "Onay",
  "emailText": "Merhaba,\n\nBu, sunucu için otomatik bir onay mesajıdır:\n\n%VAR%\n\nKodunuz:\n\n%VAR%\n\nBu mesajı beklemiyorsanız, görmezden gelebilirsiniz.",
  "verifyEmbedTitle": "✉️ E-posta Doğrulama",
  "verifyEmbedInstructions": "Doğrulama sürecini başlatmak için aşağıdaki butona tıklayın. E-posta ile bir kod alacaksınız.\n\nZaten bir kodunuz var mı? **Kod Gir** butonunu kullanın.",
  "verifyEmbedFooter": "Doğrulama Sistemi",
  "verifyDmDescription": "**%VAR%** sunucusuna hoş geldiniz! E-posta adresinizi doğrulamak ve sunucuya erişim sağlamak için aşağıdaki butona tıklayın.",
  "verifyDmButton": "Doğrulamayı Başlat",
  "verifyDmAdminWarning": "Not: Sunucu yöneticisi kullandığınız e-posta adresini görebilir",
  "buttonCreated": "✅ Doğrulama butonu başarıyla oluşturuldu!",
  "emailModalTitle": "📧 E-posta Doğrulama",
  "emailModalHeader": "## Kimliğinizi Doğrulayın\nDoğrulama kodu almak için aşağıya e-posta adresinizi girin.",
  "emailModalLabel": "E-posta Adresi",
  "emailModalPlaceholder": "adiniz@",
  "emailModalAdminWarning": "\n\n⚠️ **Not:** Sunucu yöneticisi kullandığınız e-posta adresini görebilir.",
  "emailModalAllDomainsAccepted": "✅ Herhangi bir e-posta adresi kabul edilir",
  "emailModalAcceptedDomains": "📋 **Bu domainlerden birinden e-posta kullanmalısınız:**",
  "emailModalDomainExample": "`%VAR%`\n    ↳ örn. `%VAR%`",
  "emailModalRolesAssigned": "🎭 **Alacağınız roller**",
  "codeModalTitle": "🔐 Doğrulama Kodunu Girin",
  "codeModalHeader": "## Neredeyse Bitti!\n6 haneli doğrulama kodu için gelen kutunuzu kontrol edin.",
  "codeModalLabel": "Doğrulama Kodu",
  "codeModalPlaceholder": "6 haneli kodu girin",
  "enterCodeButton": "Kod Gir",
  "codePromptTitle": "📬 Kod Gönderildi!",
  "codePromptDescription": "Şu adrese doğrulama kodu gönderildi:\n`%VAR%`\n\nKodunuzu girmek için aşağıdaki butona tıklayın.",
  "codePromptTip": "💡 Almadınız mı?",
  "codePromptTipValue": "Spam/gereksiz klasörünüzü kontrol edin. E-postanın gelmesi birkaç dakika sürebilir.",
  "mailInvalidTitle": "❌ Geçersiz E-posta",
  "mailInvalidDescription": "Girdiğiniz e-posta adresi geçerli değil.\n\nLütfen kontrol edin:\n• E-posta doğru formatta mı (ad@domain.com)\n• İzin verilen bir e-posta domaini mi kullanıyorsunuz\n• Adreste boşluk yok mu",
  "verificationSuccessTitle": "✅ Doğrulama Tamamlandı!",
  "verificationSuccessDescription": "Hoş geldiniz! Başarıyla doğrulandınız.\n\n**Atanan rol:** %VAR%\n**Sunucu:** %VAR%\n\nArtık sunucuya tam erişiminiz var.",
  "invalidCodeTitle": "❌ Geçersiz Kod",
  "invalidCodeDescription": "Girdiğiniz kod yanlış.\n\n**Ne yapmalı:**\n• E-postanızdaki 6 haneli kodu tekrar kontrol edin\n• En son kodu kullandığınızdan emin olun\n• Gerekirse doğrulama butonuna tekrar tıklayarak yeni kod isteyin",
  "errorGenericTitle": "❌ Bir Hata Oluştu",
  "errorGenericDescription": "İsteğiniz işlenirken bir sorun oluştu. Sunucu yöneticisi bilgilendirildi ve inceleyecek.",
  "errorFieldGuild": "Sunucu",
  "errorFieldUser": "Kullanıcı",
  "errorFallbackWarning": "⚠️ Yedek Bildirim",
  "errorNotifyChannelFailed": "Yapılandırılmış hata kanalı artık mevcut değil veya bot oraya mesaj gönderemiyor. Hata bunun yerine sahibine gönderildi. Lütfen `/set_error_notify` ile yeniden yapılandırın.",
  "errorNotifyUserFailed": "Bildirimler için yapılandırılmış kullanıcı artık sunucuda değil veya DM'leri kapalı. Hata bunun yerine sahibine gönderildi. Lütfen `/set_error_notify` ile yeniden yapılandırın.",
  "errorNotifySetOwner": "✅ Hata bildirimleri artık sunucu sahibine DM ile gönderilecek.",
  "errorNotifySetChannel": "✅ Hata bildirimleri artık #%VAR% kanalına gönderilecek.",
  "errorNotifySetUser": "✅ Hata bildirimleri artık %VAR% kullanıcısına DM ile gönderilecek.",
  "errorNotifyInvalidChannel": "❌ Hata bildirimleri için lütfen bir metin kanalı seçin.",
  "errorNotifyUserNotInGuild": "❌ Seçilen kullanıcı bu sunucunun üyesi değil.",
  "errorNotifyStatusTitle": "📋 Hata Bildirim Ayarları",
  "errorNotifyStatusOwner": "Hata bildirimleri **sunucu sahibine** (%VAR%) DM ile gönderilir.",
  "errorNotifyStatusChannel": "Hata bildirimleri **#%VAR%** kanalına gönderilir.",
  "errorNotifyStatusChannelInvalid": "⚠️ Bildirimler artık mevcut olmayan bir kanal için yapılandırılmış. Sunucu sahibi kullanılacak.",
  "errorNotifyStatusUser": "Hata bildirimleri **%VAR%** kullanıcısına DM ile gönderilir.",
  "errorNotifyStatusUserInvalid": "⚠️ Bildirimler artık sunucuda olmayan bir kullanıcı için yapılandırılmış. Sunucu sahibi kullanılacak.",
  "errorNotifyStatusNote": "ℹ️ Not",
  "errorNotifyStatusNoteValue": "Yapılandırılmış bildirim yöntemi başarısız olursa, hatalar otomatik olarak sunucu sahibine gönderilir.",
  "errorRoleAssignTitle": "Rol Atama Hatası",
  "errorRoleAssignMessage": "Bir kullanıcıya doğrulanmış/doğrulanmamış rol atanamadı. Lütfen kontrol edin:\n• Bot rolü doğrulanmış/doğrulanmamış rollerden daha yüksekte\n• Roller hala mevcut\n• Bot 'Rolleri Yönet' iznine sahip\n\n💡 **İpucu:** Sunucu Ayarları → Roller'de EmailBot rolünü doğrulanmış/doğrulanmamış rollerin üzerine taşıyın veya doğrulanmış/doğrulanmamış rolü doğrudan bota atayın.\n[Örneğe bakın](https://raw.githubusercontent.com/lkaesberg/EmailBot/main/images/bothierarchy.png)",
  "errorBotNotConfiguredTitle": "Bot Yapılandırılmamış",
  "errorBotNotConfiguredMessage": "Bir kullanıcı doğrulamaya çalıştı ancak bot düzgün yapılandırılmamış.\n\n**Gerekli kurulum:**\n• `/domain add` ile izin verilen e-posta domainlerini ayarlayın\n• `/role verified` ile doğrulanmış rolü ayarlayın\n\nMevcut yapılandırmayı kontrol etmek için `/status` çalıştırın."
}

```

# mkdocs.yml

```yml
site_name: UTMJBC Bot
repo_url: https://github.com/mrc2rules/UTMJBC-Bot
theme:
  name: material
  icon:
    repo: fontawesome/brands/github
  logo: https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/emailbot-border.png
  favicon: https://raw.githubusercontent.com/mrc2rules/UTMJBC-Bot/main/images/emailbot.png
  palette:
    scheme: default
    primary: black
    accent: yellow
  features:
    - navigation.tabs
nav:
  - 'index.md'
  - 'commands.md'
  - 'statistics.md'
  - 'status.md'
  - 'contributing.md'
  - 'legal.md'

```

# package.json

```json
{
  "name": "emailbot",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "node src/sharder.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@discordjs/builders": "^1.13.1",
    "@discordjs/rest": "^2.6.0",
    "@google/generative-ai": "^0.24.1",
    "cors": "^2.8.5",
    "discord-api-types": "^0.38.37",
    "discord.js": "^14.25.1",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "node-cron": "^4.2.1",
    "nodemailer": "^7.0.3",
    "nodemailer-smtp-transport": "^2.7.4",
    "sqlite3": "^5.1.7",
    "telegram": "^2.26.22",
    "topgg-autoposter": "^2.0.2"
  },
  "devDependencies": {
    "process": "^0.11.10"
  }
}

```

# README.md

```md
<!--
*** UTM Johor Bahru Community - Email Verify Bot
-->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a><img src="https://i.imgur.com/GmnbsON.png" alt="UTM JBC" width="300" title="UTM JBC"></a>
  <h3 align="center">UTM JBC Email Verification Bot</h3>
  <p align="center">
    Email verification and specialized AI powered query bot for UTM JBC.
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/actions/workflow/status/mrc2rules/EmailVerify/ci.yml?style=for-the-badge" alt="Build Status">
    <img src="https://img.shields.io/github/license/mrc2rules/EmailVerify?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/github/forks/mrc2rules/EmailVerify?style=for-the-badge&logo=github&logoColor=white" alt="Forks">
    <img src="https://img.shields.io/github/stars/mrc2rules/EmailVerify?style=for-the-badge&logo=github&logoColor=white" alt="Stars">
  </p>

  <p align="center">
    </a>
    <a href="https://discord.gg/vuGTVyFgck">
      <img src="https://img.shields.io/discord/1407328981929431071?style=for-the-badge&logo=discord&logoColor=7289da&label=Join%20Discord&color=7289da" alt="Join Discord">
    </a>
  </p>
</p>

---

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">📋 Table of Contents</h2></summary>
  <ol>
    <li><a href="#-about">About</a></li>
    <li><a href="#-how-it-works">How It Works</a></li>
    <li><a href="#-commands">Commands</a></li>
    <li>
      <a href="#-self-hosting">Self Hosting</a>
      <ul>
        <li><a href="#docker-recommended">Docker (Recommended)</a></li>
        <li><a href="#manual-installation">Manual Installation</a></li>
      </ul>
    </li>
    <li><a href="#-contributors">Contributors</a></li>
  </ol>
</details>

---

## 📖 About

This is the official bot for the **UTMJBC** Discord server. It handles email verification for students and provides an AI-powered query system to answer questions relevant to UTM students.

- Email verification to confirm student identity
- AI-powered grounded query system for UTM-related questions, with the help of UTMWiki (https://utm.gitbook.io/) 

> ⚠️ **Disclaimer:** UTM Johor Bahru Community (UTMJBC) and this project are **not affiliated with or endorsed by Universiti Teknologi Malaysia (UTM)** in any way. This is an independent student-run community.

---

## 📝 Commands

### 👤 User Commands

| Command | Description |
|---------|-------------|
| `/verify` | Start the email verification process |
| `/data delete-user` | Delete your verification data and remove verified status |

### 👥 Role Configuration

| Command | Description |
|---------|-------------|
| `/role add <role>` | Add a default role given to all verified users |
| `/role remove <role>` | Remove a role from the default roles list |
| `/role list` | View all default roles |
| `/role unverified [role]` | Set or view the optional role for unverified members |

### 🎭 Domain-Specific Roles

| Command | Description |
|---------|-------------|
| `/domainrole add <domain> <role>` | Add a role for a specific email domain |
| `/domainrole remove <domain> <role>` | Remove a role from a domain |
| `/domainrole list` | View all domain-role mappings |
| `/domainrole clear <domain>` | Remove all roles for a domain |

### 📧 Domain Management

| Command | Description |
|---------|-------------|
| `/domain add <domains>` | Add allowed email domains (supports `*` wildcard) |
| `/domain remove <domains>` | Remove allowed domains |
| `/domain list` | View all allowed domains |
| `/domain clear` | Remove all allowed domains |

### 🚫 Blacklist Management

| Command | Description |
|---------|-------------|
| `/blacklist add <patterns>` | Block email patterns (supports `*` wildcard) |
| `/blacklist remove <patterns>` | Unblock patterns |
| `/blacklist list` | View all blacklisted entries |
| `/blacklist clear` | Remove all blacklist entries |

### ⚙️ Settings

| Command | Description |
|---------|-------------|
| `/settings language <lang>` | Change the bot's language |
| `/settings log-channel [channel]` | Set or disable the verification log channel |
| `/settings verify-message [message]` | Set or reset custom message in verification emails |
| `/settings auto-verify <enable>` | Auto-prompt new members to verify on join |
| `/settings auto-unverified <enable>` | Auto-assign unverified role to new members |

### 🛡️ Moderation & Setup

| Command | Description |
|---------|-------------|
| `/button <channel> <buttontext>` | Create a verification button embed in a channel |
| `/manualverify <user> <email>` | Manually verify a user without email confirmation |
| `/set_error_notify` | Configure where error notifications are sent |

### 📊 Information

| Command | Description |
|---------|-------------|
| `/status` | View bot configuration, statistics, and check for issues |
| `/help` | Show setup instructions and command overview |

### ⚠️ Data Management

| Command | Description |
|---------|-------------|
| `/data delete-user` | Delete your personal verification data |
| `/data delete-server` | Delete all server data and reset the bot |

> ⚠️ **Note:** Most commands require administrator permissions

### Important: Role Hierarchy

The bot role **must be higher** in the role hierarchy than the verified and unverified roles, otherwise role assignment will fail.

---

## 🐳 Self Hosting

### Docker (Recommended)

#### 1. Create a directory for the bot
\`\`\`bash
mkdir emailverify && cd emailverify
\`\`\`

#### 2. Create the config file
\`\`\`bash
mkdir config
nano config/config.json
\`\`\`

\`\`\`json
{
  "token": "<Discord Bot Token>",
  "clientId": "<Discord Bot Client ID>",
  "email": "<Email Address>",
  "username": "<Mail Server Username>",
  "password": "<Email Password>",
  "smtpHost": "<SMTP Server>",
  "isGoogle": false
}
\`\`\`

#### 3. Create docker-compose.yml
\`\`\`yaml
version: '3'
services:
  emailverify:
    image: ghcr.io/lkaesberg/emailverify:latest
    ports:
      - 8181:8181
    volumes:
      - ./config:/usr/app/config
    restart: always
\`\`\`

#### 4. Start the bot
\`\`\`bash
docker-compose up -d
\`\`\`

---

### Manual Installation

**Requirements:** Node.js v16.15.0 or higher

#### 1. Clone the repository
\`\`\`bash
git clone https://github.com/mrc2rules/EmailVerify.git
cd EmailVerify
\`\`\`

#### 2. Create the config file
\`\`\`bash
nano config/config.json
\`\`\`

\`\`\`json
{
  "token": "<Discord Bot Token>",
  "clientId": "<Discord Bot Client ID>",
  "email": "<Email Address>",
  "username": "<Mail Server Username>",
  "password": "<Email Password>",
  "smtpHost": "<SMTP Server>",
  "isGoogle": false
}
\`\`\`

#### 3. Install dependencies and start
\`\`\`bash
npm install
npm start
\`\`\`

---

### Configuration Options

| Option | Description |
|--------|-------------|
| `token` | Your Discord Bot Token from the [Discord Developer Portal](https://discord.com/developers/applications) |
| `clientId` | Your Discord Bot's Client ID |
| `email` | The email address that will send verification codes |
| `username` | SMTP server username (usually your email address) |
| `password` | SMTP server password or App Password |
| `smtpHost` | Your SMTP server (e.g., `smtp.gmail.com`) |
| `isGoogle` | Set to `true` if using Gmail |

> 💡 **Gmail Users:** You need to create an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

### Debugging

Type `email` in the console to enable debugging messages for email errors.

---

## 👥 Contributors

### UTMJBC Development
- **mrc2rules** - [GitHub](https://github.com/mrc2rules)

### Original Project
This bot is based on [EmailVerify](https://github.com/lkaesberg/EmailVerify) by [Lars Kaesberg](https://github.com/lkaesberg).

---

<p align="center">
  Made with ❤️ for the UTM Johor Bahru Community<br/><br/>
  <a href="https://discord.gg/vuGTVyFgck">
    <img src="https://img.shields.io/discord/1407328981929431071?style=for-the-badge&logo=discord&logoColor=7289da&label=Join%20Discord&color=7289da" alt="Join Discord">
  </a>
  &nbsp;
  <a href="https://utm.gitbook.io/">
    <img src="https://img.shields.io/badge/Community%20Guide-5A001C?style=for-the-badge&logoColor=white" alt="Community Guide">
  </a>
  &nbsp;
  <a href="mailto:utmjbc@gmail.com">
    <img src="https://img.shields.io/badge/utmjbc@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

```

# src\api\DiscordRest.js

```js
const {REST} = require("@discordjs/rest");
const {token} = require("../../config/config.json");

module.exports = new REST({ version: '10' }).setToken(token);
```

# src\api\ServerStatsAPI.js

```js
const ServerStats = require("../ServerStats");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

class ServerStatsAPI {
    constructor(bot, startServer = true) {
        this.app = express();
        this.port = process.env.PORT || 8181;
        this.bot = bot
        this.started = false;
        this.historyFileName = "config/ServerStatsHistory.log"

        this.serverStats = new ServerStats(() => this.getServerCount())

        this.registerEndpoints()
        if (startServer) this.start()

    }

    async getServerCount() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                const counts = await shardUtil.fetchClientValues('guilds.cache.size');
                return counts.reduce((sum, count) => sum + Number(count || 0), 0);
            }
        } catch {}
        return this.bot.guilds.cache.size;
    }

    registerEndpoints() {
        this.app.use(cors({
            origin: [
                "https://jbcbot.rahbab.com",
                "https://services-jbcemail.alwaysdata.net",
                "http://localhost:8000"
            ]
        }));

        this.app.get('/mailsSendAll', (req, res) => {
            res.send(this.serverStats.mailsSendAll.toString())
        });

        this.app.get('/mailsSendToday', async (req, res) => {
            await this.serverStats.testDate()
            res.send(this.serverStats.mailsSendToday.toString())
        });

        this.app.get('/usersVerifiedAll', (req, res) => {
            res.send(this.serverStats.usersVerifiedAll.toString())
        });

        this.app.get('/usersVerifiedToday', async (req, res) => {
            await this.serverStats.testDate()
            res.send(this.serverStats.usersVerifiedToday.toString())
        });

        this.app.get('/serverCount', async (req, res) => {
            const count = await this.getServerCount();
            res.send(count.toString());
        });

        // Get current stats as JSON (for the stats page)
        this.app.get('/stats/current', async (req, res) => {
            await this.serverStats.testDate()
            const serverCount = await this.getServerCount()
            res.json({
                date: new Date().toISOString().split('T')[0],
                mailsSendToday: this.serverStats.mailsSendToday,
                mailsSendAll: this.serverStats.mailsSendAll,
                usersVerifiedToday: this.serverStats.usersVerifiedToday,
                usersVerifiedAll: this.serverStats.usersVerifiedAll,
                serverCount: serverCount
            })
        });

        // Get historical stats from log file
        this.app.get('/stats/history', async (req, res) => {
            const days = parseInt(req.query.days) || 30
            try {
                const history = this.parseHistoryFile(days)
                res.json(history)
            } catch (err) {
                res.status(500).json({ error: 'Failed to read history' })
            }
        });
    }

    parseHistoryFile(days) {
        if (!fs.existsSync(this.historyFileName)) {
            return []
        }
        
        // Read only the last N lines efficiently from the end of file
        const lines = this.readLastLines(days)
        
        const results = []
        for (const line of lines) {
            const parts = line.split(',')
            if (parts.length >= 4) {
                // Handle both old format (4 cols) and new format (6 cols)
                const entry = {
                    date: parts[0],
                    mailsSendToday: parseInt(parts[1]) || 0,
                    mailsSendAll: parseInt(parts[2]) || 0,
                    usersVerifiedToday: parts.length >= 5 ? parseInt(parts[3]) || 0 : 0,
                    usersVerifiedAll: parts.length >= 5 ? parseInt(parts[4]) || 0 : 0,
                    serverCount: parseInt(parts[parts.length - 1]) || 0
                }
                results.push(entry)
            }
        }
        
        return results
    }

    readLastLines(numLines) {
        const stat = fs.statSync(this.historyFileName)
        const fileSize = stat.size
        
        if (fileSize === 0) return []
        
        // Estimate ~100 bytes per line, read a bit more to be safe
        const chunkSize = Math.min(fileSize, numLines * 150)
        const buffer = Buffer.alloc(chunkSize)
        
        const fd = fs.openSync(this.historyFileName, 'r')
        try {
            // Read from end of file
            const startPos = Math.max(0, fileSize - chunkSize)
            fs.readSync(fd, buffer, 0, chunkSize, startPos)
            
            let data = buffer.toString('utf8')
            
            // If we didn't read from start, we might have a partial first line - remove it
            if (startPos > 0) {
                const firstNewline = data.indexOf('\n')
                if (firstNewline !== -1) {
                    data = data.substring(firstNewline + 1)
                }
            }
            
            const lines = data.trim().split('\n').filter(line => line.length > 0)
            
            // Return only the last N lines
            return lines.slice(-numLines)
        } finally {
            fs.closeSync(fd)
        }
    }

    start() {
        if (this.started) return;
        this.started = true;
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}!`)
        });
    }

    async increaseMailSend() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                // If this is NOT the primary shard (id 0), forward the increment to shard 0
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding mail count to shard 0`)
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received mail count from another shard`)
                            await client.serverStatsAPI.serverStats.increaseMailSend();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        // Unsharded or primary shard: update locally
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing mail send locally`)
        await this.serverStats.increaseMailSend()
    }

    async increaseVerifiedUsers() {
        try {
            const shardUtil = this.bot.shard;
            if (shardUtil && typeof shardUtil.count === 'number' && shardUtil.count > 1) {
                // If this is NOT the primary shard (id 0), forward the increment to shard 0
                if (!shardUtil.ids.includes(0)) {
                    console.log(`[Shard ${shardUtil.ids}] Forwarding verified user count to shard 0`)
                    shardUtil.broadcastEval(async (client) => {
                        if (client.shard && client.shard.ids.includes(0) && client.serverStatsAPI) {
                            console.log(`[Shard ${client.shard.ids}] Received verified user count from another shard`)
                            await client.serverStatsAPI.serverStats.increaseVerifiedUsers();
                        }
                    }).catch(() => {});
                    return;
                }
            }
        } catch {}
        // Unsharded or primary shard: update locally
        console.log(`[Shard ${this.bot.shard?.ids ?? 'N/A'}] Increasing verified users locally`)
        await this.serverStats.increaseVerifiedUsers()
    }

}

module.exports = ServerStatsAPI



```

# src\api\TopGG.js

```js
const {topggToken} = require("../../config/config.json");
const {AutoPoster} = require("topgg-autoposter");

module.exports = function (bot) {
    if (topggToken !== undefined) {
        const poster = AutoPoster(topggToken, bot);
        poster.on("error", _ => {
        })
        console.log("Posting stats to topGG!")
    } else {
        console.log("No topGG token!")
    }
}

```

# src\bot\registerBlacklistChoices.js

```js
const database = require("../database/Database");
const rest = require("../api/DiscordRest");
const {Routes} = require("discord-api-types/v9");
const {clientId} = require("../../config/config.json");

function truncateString(str) {
    if (str.length > 100) {
        return str.substring(0, 96) + '...';
    }
    return str;
}

module.exports = async function registerBlacklistChoices(guildId, blacklistCommand = require("../commands/blacklist")) {
    await database.getServerSettings(guildId, async serverSettings => {
        rest.get(Routes.applicationGuildCommands(clientId, guildId)).then(async commands => {
            const command = commands.find(cmd => cmd.name === "blacklist")
            const commandId = command?.id

            if (!commandId) return

            let blacklistCommandData = blacklistCommand.data.toJSON()

            // Find the 'remove' subcommand and update its choices
            const removeSubcommand = blacklistCommandData.options.find(opt => opt.name === "remove")
            if (removeSubcommand && removeSubcommand.options) {
                const emailsOption = removeSubcommand.options.find(opt => opt.name === "emails")
                if (emailsOption) {
                    if (serverSettings.blacklist.length > 0 && serverSettings.blacklist.length <= 25) {
                        emailsOption.choices = serverSettings.blacklist.map(entry => {
                            return {"name": truncateString(entry), "value": truncateString(entry)}
                        })
                    } else {
                        emailsOption.choices = undefined
                    }
                }
            }

            rest.patch(Routes.applicationGuildCommand(clientId, guildId, commandId), {body: blacklistCommandData}).catch()
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}

```

# src\bot\registerRemoveDomain.js

```js
const database = require("../database/Database");
const rest = require("../api/DiscordRest");
const {Routes} = require("discord-api-types/v9");
const {clientId} = require("../../config/config.json");

function truncateString(str) {
    if (str.length > 100) {
        return str.substring(0, 96) + '...';
    }
    return str;
}

module.exports = async function registerRemoveDomain(guildId, domainCommand = require("../commands/domain")) {
    await database.getServerSettings(guildId, async serverSettings => {
        rest.get(Routes.applicationGuildCommands(clientId, guildId)).then(async commands => {
            const command = commands.find(cmd => cmd.name === "domain")
            const commandId = command?.id

            if (!commandId) return

            let domainCommandData = domainCommand.data.toJSON()

            // Find the 'remove' subcommand and update its choices
            const removeSubcommand = domainCommandData.options.find(opt => opt.name === "remove")
            if (removeSubcommand && removeSubcommand.options) {
                const domainsOption = removeSubcommand.options.find(opt => opt.name === "domains")
                if (domainsOption) {
                    if (serverSettings.domains.length > 0 && serverSettings.domains.length <= 25) {
                        domainsOption.choices = serverSettings.domains.map(domain => {
                            return {"name": truncateString(domain), "value": truncateString(domain)}
                        })
                    } else {
                        domainsOption.choices = undefined
                    }
                }
            }

            rest.patch(Routes.applicationGuildCommand(clientId, guildId, commandId), {body: domainCommandData}).catch()
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
}

```

# src\bot\scrape.js

```js
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.json');

// Dynamically load every command file from src/commands/
// Adding a new command = drop a file in that folder, nothing else needed here
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

const commands = commandFiles.map(file => require(path.join(commandsPath, file)));

// Build a lookup map for fast routing in the interaction handler
const commandMap = new Map(commands.map(cmd => [cmd.definition.name, cmd]));

console.log(`[CommandHandler] Loaded ${commands.length} commands: ${[...commandMap.keys()].join(', ')}`);

// Registers all slash commands with Discord as guild commands.
// Guild commands update instantly (vs global commands which take up to 1 hour).
async function registerCommands() {
    if (!config.clientId || !config.guildId) {
        return console.warn('[CommandHandler] clientId or guildId missing from config — skipping slash command registration.');
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log('[CommandHandler] Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands.map(cmd => cmd.definition) }
        );

        console.log(`[CommandHandler] Successfully registered ${commands.length} slash commands.`);
    } catch (err) {
        console.error('[CommandHandler] Failed to register slash commands:', err.message);
    }
}

// Attaches the interactionCreate listener to the Discord client.
// Call this once during bot startup, before the client logs in.
function attachInteractionHandler(discordClient) {
    discordClient.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = commandMap.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`[CommandHandler] Error executing /${interaction.commandName}:`, err.message);

            const errorMsg = '❌ An unexpected error occurred while running this command.';
            if (interaction.deferred || interaction.replied) {
                interaction.editReply(errorMsg).catch(() => {});
            } else {
                interaction.reply({ content: errorMsg, ephemeral: true }).catch(() => {});
            }
        }
    });

    console.log('[CommandHandler] Interaction handler attached.');
}

module.exports = { registerCommands, attachInteractionHandler };

```

# src\bot\sendVerifyMessage.js

```js
const database = require("../database/Database");
const {getLocale} = require("../Language");
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');
const ErrorNotifier = require("../utils/ErrorNotifier");

/**
 * Send verification DM to user (used for autoVerify on member join)
 */
module.exports = async function sendVerifyMessage(guild, user, userGuilds) {
    await database.getServerSettings(guild.id, (async serverSettings => {
        if (!serverSettings.status) {
            // Send generic error to user
            try {
                const embed = new EmbedBuilder()
                    .setTitle(getLocale(serverSettings.language, 'errorGenericTitle'))
                    .setDescription(getLocale(serverSettings.language, 'errorGenericDescription'))
                    .setColor(0xED4245);
                await user.send({ embeds: [embed] });
            } catch {}
            // Notify admin about configuration issue
            await ErrorNotifier.notify({
                guild: guild,
                errorTitle: getLocale(serverSettings.language, 'errorBotNotConfiguredTitle'),
                errorMessage: getLocale(serverSettings.language, 'errorBotNotConfiguredMessage'),
                user: user,
                language: serverSettings.language
            });
            return
        }
        
        userGuilds.set(user.id, guild)
        
        // Build verification DM message
        const embed = new EmbedBuilder()
            .setTitle(getLocale(serverSettings.language, 'verifyEmbedTitle'))
            .setDescription(getLocale(serverSettings.language, 'verifyDmDescription', guild.name))
            .setColor(0x5865F2)
            .setThumbnail(guild.iconURL({ dynamic: true }))
        
        if (serverSettings.logChannel !== "") {
            embed.setFooter({ text: getLocale(serverSettings.language, 'verifyDmAdminWarning') })
        }
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('openEmailModal')
                .setLabel(getLocale(serverSettings.language, 'verifyDmButton'))
                .setStyle(ButtonStyle.Primary)
                .setEmoji('📧'),
            new ButtonBuilder()
                .setCustomId('openCodeModal')
                .setLabel(getLocale(serverSettings.language, 'enterCodeButton'))
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🔑')
        )
        
        await user.send({ embeds: [embed], components: [row] }).catch(() => {})
    }))
}

```

# src\bot\showEmailModal.js

```js
const {ModalBuilder, TextInputBuilder, TextInputStyle, LabelBuilder, TextDisplayBuilder, MessageFlags} = require('discord.js');
const database = require("../database/Database");
const {getLocale} = require("../Language");
const {createSessionExpiredEmbed} = require("../utils/embeds");

/**
 * Checks if a domain is a full wildcard (accepts all emails)
 * Matches: *, @*, @*.*, *.*, etc.
 * @param {string} domain - The domain string
 * @returns {boolean}
 */
function isFullWildcard(domain) {
    const trimmed = domain.trim().replace('@', '')
    // Check for patterns that accept all emails:
    // "*", "*.*", "**", etc. - anything that's only wildcards and dots
    return /^[\*\.]+$/.test(trimmed)
}

/**
 * Creates a pattern description with [any] placeholders
 * @param {string} pattern - Domain pattern without @ (e.g., "*.edu", "gmail.*")
 * @returns {string} - Pattern like "[any].edu" or "gmail.[any]"
 */
function createPatternDescription(pattern) {
    return pattern.replace(/\*/g, '[any]')
}

/**
 * Creates an example domain by replacing wildcards with realistic placeholders
 * @param {string} pattern - Domain pattern without @ (e.g., "*.edu", "gmail.*", "*.*.de")
 * @returns {string} - Example domain (e.g., "company.edu", "gmail.com", "mail.company.de")
 */
function createExampleDomain(pattern) {
    const parts = pattern.split('.')
    const exampleWords = ['company', 'mail', 'example']
    let wordIndex = 0
    
    return parts.map(part => {
        if (part === '*') {
            const word = exampleWords[wordIndex % exampleWords.length]
            wordIndex++
            return word
        }
        return part
    }).join('.')
}

/**
 * Formats a domain for display with pattern and example
 * @param {string} domain - The domain string (e.g., "@example.com", "@*.edu", "@gmail.*")
 * @param {string} language - The language code for localization
 * @param {string[]} roleNames - Optional array of role names for this domain
 * @returns {string} - Formatted domain string
 */
function formatDomain(domain, language, roleNames = []) {
    const trimmed = domain.trim()
    const withoutAt = trimmed.replace('@', '')
    
    let formatted
    // If no wildcards, show as simple code-formatted domain
    if (!withoutAt.includes('*')) {
        formatted = `\`[name]${trimmed}\``
    } else {
        // Create pattern description and example
        const pattern = '[name]@' + createPatternDescription(withoutAt)
        const example = 'name@' + createExampleDomain(withoutAt)
        formatted = getLocale(language, "emailModalDomainExample", pattern, example)
    }
    
    // Add role info if available
    if (roleNames.length > 0) {
        formatted += ` → ${roleNames.join(', ')}`
    }
    
    return formatted
}

/**
 * Shows the email verification modal in response to an interaction
 * @param {Interaction} interaction - The Discord interaction to respond to
 * @param {Guild} guild - The guild context for verification
 * @param {Map} userGuilds - Map to store user-guild associations
 */
async function showEmailModal(interaction, guild, userGuilds) {
    if (!guild) {
        await interaction.reply({ embeds: [createSessionExpiredEmbed(false)], flags: MessageFlags.Ephemeral }).catch(() => {})
        return false
    }
    userGuilds.set(interaction.user.id, guild)
    
    await database.getServerSettings(guild.id, async serverSettings => {
        const language = serverSettings.language
        const domains = serverSettings.domains || []
        const domainRoles = serverSettings.domainRoles || {}
        const defaultRoles = serverSettings.defaultRoles || []
        
        // Helper to get role names from IDs
        const getRoleNames = (roleIds) => {
            return roleIds
                .map(id => {
                    const role = guild.roles.cache.get(id)
                    return role ? role.name : null
                })
                .filter(name => name !== null)
        }
        
        // Build header text
        let headerText = getLocale(language, "emailModalHeader")
        
        // Check if all domains are accepted (if ANY domain is a full wildcard, all emails are accepted)
        const hasNoDomains = domains.length === 0
        const hasAnyFullWildcard = domains.some(d => isFullWildcard(d))
        const allDomainsAccepted = hasNoDomains || hasAnyFullWildcard
        
        // Get default role names for display
        const defaultRoleNames = getRoleNames(defaultRoles)
        
        // Check if there are any non-wildcard domain-specific roles to show
        const domainsWithSpecificRoles = Object.keys(domainRoles).filter(d => !isFullWildcard(d))
        const hasSpecificDomainRoles = domainsWithSpecificRoles.length > 0
        
        if (allDomainsAccepted) {
            // All domains accepted
            headerText += `\n\n${getLocale(language, "emailModalAllDomainsAccepted")}`
            
            // Collect base roles: default roles + any domain-specific roles from wildcard patterns
            const baseRoleIds = [...defaultRoles]
            for (const domain of domains) {
                if (isFullWildcard(domain) && domainRoles[domain]) {
                    baseRoleIds.push(...domainRoles[domain])
                }
            }
            const uniqueBaseRoleIds = [...new Set(baseRoleIds)]
            const baseRoleNames = getRoleNames(uniqueBaseRoleIds)
            
            // Show base roles if any
            if (baseRoleNames.length > 0) {
                headerText += `\n${getLocale(language, "emailModalRolesAssigned")}: ${baseRoleNames.join(', ')}`
            }
            
            // If there are specific domain roles, show them as bonus roles
            if (hasSpecificDomainRoles) {
                headerText += `\n\n📋 **Additional roles for specific domains:**`
                domainsWithSpecificRoles.forEach((domain) => {
                    const domainSpecificRoles = domainRoles[domain] || []
                    const roleNames = getRoleNames(domainSpecificRoles)
                    if (roleNames.length > 0) {
                        const domainDisplay = domain.replaceAll('*', '✱')
                        headerText += `\n• \`${domainDisplay}\` → +${roleNames.join(', ')}`
                    }
                })
            }
        } else {
            // Show formatted domain list with roles
            headerText += `\n\n${getLocale(language, "emailModalAcceptedDomains")}`
            domains.forEach((domain, index) => {
                // Get domain-specific roles + default roles
                const domainSpecificRoles = domainRoles[domain] || []
                const allRoleIds = [...new Set([...domainSpecificRoles, ...defaultRoles])]
                const roleNames = getRoleNames(allRoleIds)
                
                const formatted = formatDomain(domain, language, roleNames)
                headerText += `\n${index + 1}. ${formatted}`
            })
        }
        
        // Add custom verify message if set
        if (serverSettings.verifyMessage !== "") {
            headerText += `\n\n${serverSettings.verifyMessage}`
        }
        
        // Add admin warning if log channel is enabled
        if (serverSettings.logChannel !== "") {
            headerText += getLocale(language, "emailModalAdminWarning")
        }
        
        const modal = new ModalBuilder()
            .setCustomId('emailModal')
            .setTitle(getLocale(language, "emailModalTitle"))
        
        // Build placeholder with smart domain hint
        let placeholder = getLocale(language, "emailModalPlaceholder")
        const firstDomain = domains[0] || '@example.com'
        if (isFullWildcard(firstDomain)) {
            placeholder += 'example.com'
        } else if (firstDomain.includes('*')) {
            // For wildcard like "@*.edu", show "example.edu"
            placeholder += 'example' + firstDomain.replace('@', '').replace('*', '')
        } else {
            // Domain already has @, so just remove it for placeholder
            placeholder += firstDomain.replace('@', '')
        }
        
        const emailInput = new TextInputBuilder()
            .setCustomId('emailInput')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(placeholder)
            .setRequired(true)
        
        const emailLabel = new LabelBuilder()
            .setLabel(getLocale(language, "emailModalLabel"))
            .setTextInputComponent(emailInput)
        
        const headerDisplay = new TextDisplayBuilder().setContent(headerText)
        
        modal
            .addTextDisplayComponents(headerDisplay)
            .addLabelComponents(emailLabel)
        
        await interaction.showModal(modal).catch(() => {})
    })
    return true
}

module.exports = { showEmailModal }


```

# src\commands\addchannel.js

```js
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { channelExists, addChannel } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'addchannel',
        description: 'Add a Telegram channel to the scrape list. (Admin only)',
        options: [
            {
                name: 'channel',
                description: 'Telegram channel username (e.g. @utmjbc) or numeric ID',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ Telegram client is not connected yet. Please try again in a moment.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const input = interaction.options.getString('channel').trim();

        // Resolve and validate the channel via Telegram — rejects bad usernames/IDs early
        let entity;
        try {
            // gramjs requires numeric IDs to be BigInt, otherwise string usernames
            const targetInput = /^-?\d+$/.test(input) ? BigInt(input) : input;
            entity = await state.telegramClient.getEntity(targetInput);
        } catch {
            return interaction.editReply(
                `❌ Could not find a Telegram channel for \`${input}\`.\n` +
                `Make sure the username is correct and the bot account has access to it.`
            );
        }

        if (entity.className !== 'Channel' && entity.className !== 'Chat') {
            return interaction.editReply(
                `❌ The entity \`${input}\` is a **${entity.className}**, not a Channel or Group.\n` +
                `Only Channels and Groups can be added to the scrape list.`
            );
        }

        // Format the ID correctly for gramjs future resolution
        let channelId = String(entity.id);
        if (entity.className === 'Channel' && !channelId.startsWith('-100')) {
            channelId = '-100' + channelId;
        } else if (entity.className === 'Chat' && !channelId.startsWith('-')) {
            channelId = '-' + channelId;
        }
        
        const channelTitle = entity.title || entity.username || channelId;

        const alreadyTracked = await channelExists(channelId);
        if (alreadyTracked) {
            return interaction.editReply(
                `ℹ️ **${channelTitle}** (\`${channelId}\`) is already in the scrape list.`
            );
        }

        await addChannel(channelId, channelTitle, interaction.user.tag);

        return interaction.editReply(
            `✅ Added **${channelTitle}** (\`${channelId}\`) to the scrape list.\n` +
            `It will be included in the next scrape cycle.`
        );
    },
};

```

# src\commands\blacklist.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");
const registerBlacklistChoices = require("../bot/registerBlacklistChoices");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Block specific email addresses or patterns from verifying')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add email addresses or patterns to the blacklist (supports * wildcard)')
                .addStringOption(option =>
                    option
                        .setName('emails')
                        .setDescription('Pattern(s) to block, e.g. *@tempmail.*, spam* (comma-separated)')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove email addresses or patterns from the blacklist')
                .addStringOption(option =>
                    option
                        .setName('emails')
                        .setDescription('Pattern to unblock (select from list or type manually)')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('View all blacklisted email addresses and patterns')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Remove all entries from the blacklist')
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            if (subcommand === 'list') {
                if (serverSettings.blacklist.length === 0) {
                    await interaction.reply({
                        content: "🚫 **No blacklisted emails.**\n\nAdd entries with `/blacklist add` to block email addresses or patterns.\n\n**Examples (supports `*` wildcard):**\n• `spam@example.com` — Block specific email\n• `*@tempmail.*` — Block all tempmail domains\n• `*spam*` — Block any email containing 'spam'\n• `test*@*` — Block emails starting with 'test'",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    const blacklistDisplay = serverSettings.blacklist
                        .map(b => `\`${b.replaceAll("*", "✱")}\``)
                        .join('\n• ');
                    await interaction.reply({
                        content: `🚫 **Blacklisted patterns:**\n• ${blacklistDisplay}\n\n💡 **Tip:** Use \`*\` as wildcard (e.g. \`*@tempmail.*\` blocks all tempmail domains)\n\n*Use \`/blacklist add\`, \`/blacklist remove\`, or \`/blacklist clear\` to modify.*`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'add') {
                const emailsInput = interaction.options.getString('emails', true);
                const newEntries = emailsInput.split(",").map(name => name.trim()).filter(name => name.length > 0);
                
                if (newEntries.length === 0) {
                    await interaction.reply({
                        content: "❌ **No valid entries provided.**\n\nPlease provide email addresses or patterns to blacklist.",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                // Filter out duplicates
                const addedEntries = newEntries.filter(entry => !serverSettings.blacklist.includes(entry));
                
                if (addedEntries.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **All provided entries are already blacklisted.**",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                serverSettings.blacklist = serverSettings.blacklist.concat(addedEntries);
                database.updateServerSettings(interaction.guildId, serverSettings);
                await registerBlacklistChoices(interaction.guildId, { data: this.data });

                const addedDisplay = addedEntries.map(e => `\`${e.replaceAll("*", "✱")}\``).join(', ');
                await interaction.reply({
                    content: `✅ **Added to blacklist:** ${addedDisplay}\n\nEmails matching these patterns will be blocked from verifying.\n\n💡 **Tip:** \`*\` matches any characters (e.g. \`*@tempmail.*\` blocks all tempmail domains)`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (subcommand === 'remove') {
                const emailsInput = interaction.options.getString('emails', true);
                const removeEntries = emailsInput.split(",").map(name => name.trim()).filter(name => name.length > 0);
                
                const removedEntries = serverSettings.blacklist.filter(entry => removeEntries.includes(entry));
                serverSettings.blacklist = serverSettings.blacklist.filter(entry => !removeEntries.includes(entry));

                if (removedEntries.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **No matching entries found in blacklist.**\n\nUse `/blacklist list` to see current entries.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await registerBlacklistChoices(interaction.guildId, { data: this.data });
                    
                    const removedDisplay = removedEntries.map(e => `\`${e.replaceAll("*", "✱")}\``).join(', ');
                    await interaction.reply({
                        content: `🗑️ **Removed from blacklist:** ${removedDisplay}\n\nThese patterns are no longer blocked.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'clear') {
                if (serverSettings.blacklist.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **Blacklist is already empty.**",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                const count = serverSettings.blacklist.length;
                serverSettings.blacklist = [];
                database.updateServerSettings(interaction.guildId, serverSettings);
                await registerBlacklistChoices(interaction.guildId, { data: this.data });

                await interaction.reply({
                    content: `🗑️ **Blacklist cleared!**\n\nRemoved ${count} ${count === 1 ? 'entry' : 'entries'} from the blacklist.`,
                    flags: MessageFlags.Ephemeral
                });
            }
        });
    }
};

```

# src\commands\button.js

```js
const {SlashCommandBuilder} = require("@discordjs/builders");
const database = require("../database/Database");
const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');
const { MessageFlags } = require('discord.js');
const {getLocale} = require("../Language");

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('button')
        .setDescription("Create a verification button embed in a channel for users to verify")
        .addChannelOption(option => option
            .setName("channel")
            .setRequired(true)
            .setDescription("Channel where the verification embed will be posted"))
        .addStringOption(option => option
            .setName("buttontext")
            .setRequired(true)
            .setMaxLength(80)
            .setDescription("Text shown on the verify button (max 80 chars, e.g. 'Click to Verify')"))
        .addStringOption(option => option
            .setName("title")
            .setRequired(false)
            .setDescription("Custom title for the embed (default: localized verify title)"))
        .addStringOption(option => option
            .setName("message")
            .setRequired(false)
            .setDescription("Custom description/instructions (default: localized instructions)"))
        .addStringOption(option => option
            .setName("color")
            .setRequired(false)
            .setDescription("Embed accent color in hex format (e.g. #5865F2, #FF0000)"))
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        const rawButtonText = interaction.options.getString("buttontext", true)
        const buttonText = rawButtonText.substring(0, 80)
        const channel = interaction.options.getChannel("channel", true)
        const customMessage = interaction.options.getString("message")
        const customTitle = interaction.options.getString("title")
        const customColor = interaction.options.getString("color")

        await interaction.deferReply({flags: MessageFlags.Ephemeral})

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            const language = serverSettings.language

            // Use custom values or fall back to localized defaults
            const title = customTitle || getLocale(language, "verifyEmbedTitle")
            const description = customMessage || getLocale(language, "verifyEmbedInstructions")
            const footerText = getLocale(language, "verifyEmbedFooter")

            // Parse color or use default Discord blurple
            let embedColor = 0x5865F2
            if (customColor) {
                const parsed = customColor.replace('#', '')
                if (/^[0-9A-Fa-f]{6}$/.test(parsed)) {
                    embedColor = parseInt(parsed, 16)
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(embedColor)
                .setFooter({ 
                    text: `${interaction.guild.name} • ${footerText}`,
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                })

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("verifyButton")
                        .setLabel(buttonText)
                        .setEmoji("📧")
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId("openCodeModal")
                        .setLabel(getLocale(language, "enterCodeButton"))
                        .setEmoji("🔑")
                        .setStyle(ButtonStyle.Secondary),
                );

            const message = await channel.send({embeds: [embed], components: [buttons]}).catch(async _ => {
                await interaction.user.send("No permissions to write in that channel!").catch(async _ => {
                })
            })
            if (message === undefined) {
                return
            }

            await interaction.editReply({content: getLocale(language, "buttonCreated"), flags: MessageFlags.Ephemeral})
        })
    }
}
```

# src\commands\data.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags, PermissionsBitField } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('data')
        .setDescription('Manage stored data for privacy and compliance')
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete-user')
                .setDescription('Delete your personal verification data and remove your verified status')
                .addStringOption(option =>
                    option
                        .setName('confirm')
                        .setDescription('Type "delete" to confirm deletion of your data')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete-server')
                .setDescription('Delete all server data and remove the bot from this server (requires administrator permissions)')
                .addStringOption(option =>
                    option
                        .setName('confirm')
                        .setDescription('Type "delete" to confirm - THIS WILL REMOVE THE BOT')
                        .setRequired(true)
                )
        )
        .setDefaultMemberPermissions(null), // null allows everyone to use delete-user, but delete-server is admin-only in execute

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'delete-user') {
            const confirm = interaction.options.getString('confirm', true);
            
            if (confirm !== 'delete') {
                await interaction.reply({
                    content: "❌ **Confirmation failed.**\n\nTo delete your data, type `delete` in the confirm field.\n\n⚠️ This will:\n• Remove your verified status on this server\n• Delete your stored email hash\n• Require you to verify again",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            database.deleteUserData(interaction.user.id);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const roleUnverified = interaction.guild.roles.cache.find(role => role.id === serverSettings.unverifiedRoleName);
                const member = interaction.guild.members.cache.get(interaction.user.id);
                
                if (member !== undefined) {
                    // Remove all default roles
                    const defaultRoles = serverSettings.defaultRoles || [];
                    for (const roleId of defaultRoles) {
                        const role = interaction.guild.roles.cache.get(roleId);
                        if (role) {
                            await member.roles.remove(role).catch(() => {});
                        }
                    }
                    
                    // Remove all domain-specific roles (we don't know which domain the user verified with)
                    const domainRoles = serverSettings.domainRoles || {};
                    for (const pattern of Object.keys(domainRoles)) {
                        for (const roleId of domainRoles[pattern]) {
                            const role = interaction.guild.roles.cache.get(roleId);
                            if (role) {
                                await member.roles.remove(role).catch(() => {});
                            }
                        }
                    }
                    
                    // Re-add unverified role
                    if (roleUnverified !== undefined) {
                        await member.roles.add(roleUnverified).catch(() => {});
                    }
                }
                
                await interaction.reply({
                    content: "✅ **Your data has been deleted.**\n\n• Your verified status has been removed\n• Your stored email hash has been deleted\n• You can verify again at any time with `/verify`",
                    flags: MessageFlags.Ephemeral
                });
            });
            return;
        }

        if (subcommand === 'delete-server') {
            // Check admin permissions for server deletion
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                await interaction.reply({
                    content: "❌ **Permission denied.**\n\nOnly server administrators can delete server data.",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            const confirm = interaction.options.getString('confirm', true);
            
            if (confirm !== 'delete') {
                await interaction.reply({
                    content: "❌ **Confirmation failed.**\n\nTo delete server data, type `delete` in the confirm field.\n\n⚠️ **Warning:** This will:\n• Delete all server configuration\n• Delete all verification records\n• Remove the bot from this server",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            database.deleteServerData(interaction.guildId);
            await interaction.reply({
                content: "✅ **Server data deleted.**\n\nThe bot will now leave this server. Thank you for using Email Verify Bot!",
                flags: MessageFlags.Ephemeral
            });
            await interaction.guild.leave();
        }
    }
};

```

# src\commands\domain.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");
const registerRemoveDomain = require("../bot/registerRemoveDomain");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('domain')
        .setDescription('Manage allowed email domains for verification')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add allowed email domains (supports * wildcard, e.g. @*.edu)')
                .addStringOption(option =>
                    option
                        .setName('domains')
                        .setDescription('Domain(s) to allow, e.g. @gmail.com, @*.edu (comma-separated)')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove one or more allowed email domains')
                .addStringOption(option =>
                    option
                        .setName('domains')
                        .setDescription('Domain(s) to remove (comma-separated for multiple)')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('View all currently allowed email domains')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Remove all allowed domains (users won\'t be able to verify)')
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            if (subcommand === 'list') {
                if (serverSettings.domains.length === 0) {
                    await interaction.reply({
                        content: "📧 **No allowed domains configured.**\n\nAdd domains with `/domain add` to allow users with those email addresses to verify.\n\n**Examples:**\n• `@gmail.com` — Only Gmail addresses\n• `@company.com` — Specific company domain\n• `@*.edu` — Any .edu domain (wildcard)\n• `@*.harvard.edu` — Any Harvard subdomain\n\n**Wildcard (*) Explained:**\nThe `*` matches any text. So `@*.edu` allows `@stanford.edu`, `@mit.edu`, `@student.university.edu`, etc.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    const domainList = serverSettings.domains
                        .map(d => `\`${d.replaceAll("*", "✱")}\``)
                        .join('\n• ');
                    await interaction.reply({
                        content: `📧 **Allowed email domains:**\n• ${domainList}\n\n*Use \`/domain add\`, \`/domain remove\`, or \`/domain clear\` to modify.*\n\n💡 **Tip:** Use \`*\` as wildcard (e.g. \`@*.edu\` matches any .edu address)`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'add') {
                const domainsInput = interaction.options.getString('domains', true);
                const addedDomains = [];
                
                domainsInput.split(",").forEach(domain => {
                    domain = domain.trim();
                    if (domain.startsWith("@") && domain.includes(".")) {
                        if (!serverSettings.domains.includes(domain)) {
                            serverSettings.domains.push(domain);
                            addedDomains.push(domain);
                        }
                    } else if (!domain.includes("@") && domain.includes(".")) {
                        const formattedDomain = "@" + domain;
                        if (!serverSettings.domains.includes(formattedDomain)) {
                            serverSettings.domains.push(formattedDomain);
                            addedDomains.push(formattedDomain);
                        }
                    }
                });

                if (addedDomains.length !== 0) {
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await registerRemoveDomain(interaction.guildId);
                    
                    const addedList = addedDomains.map(d => `\`${d.replaceAll("*", "✱")}\``).join(', ');
                    await interaction.reply({
                        content: `✅ **Added domain(s):** ${addedList}\n\nUsers with email addresses matching these domains can now verify.\n\n💡 **Wildcard tip:** Use \`*\` to match any text (e.g. \`@*.edu\` allows all .edu emails)`,
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    await interaction.reply({
                        content: "❌ **No valid domains provided.**\n\n**Valid formats:**\n• `@gmail.com` or `gmail.com` — Specific domain\n• `@*.edu` — Wildcard (matches any .edu)\n• `@*.company.com` — Subdomain wildcard\n• `@domain1.com, @domain2.org` — Multiple domains\n\n**Wildcard (*) Explained:**\nThe `*` matches any text before the specified part.\n`@*.edu` → `@stanford.edu` ✓, `@mit.edu` ✓, `@cs.berkeley.edu` ✓",
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'remove') {
                const domainsInput = interaction.options.getString('domains', true);
                const removeDomains = domainsInput.split(",").map(d => d.trim());
                
                // Also check for versions without @ prefix
                const expandedRemove = [];
                removeDomains.forEach(d => {
                    expandedRemove.push(d);
                    if (!d.startsWith("@")) {
                        expandedRemove.push("@" + d);
                    }
                });
                
                const deletedDomains = serverSettings.domains.filter(domain => 
                    expandedRemove.includes(domain)
                );
                serverSettings.domains = serverSettings.domains.filter(domain => 
                    !expandedRemove.includes(domain)
                );

                if (deletedDomains.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **No matching domains found to remove.**\n\nUse `/domain list` to see current domains.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await registerRemoveDomain(interaction.guildId, { data: this.data });
                    
                    const removedList = deletedDomains.map(d => `\`${d.replaceAll("*", "✱")}\``).join(', ');
                    await interaction.reply({
                        content: `🗑️ **Removed domain(s):** ${removedList}\n\nUsers with these email addresses can no longer verify.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'clear') {
                if (serverSettings.domains.length === 0) {
                    await interaction.reply({
                        content: "⚠️ **Domain list is already empty.**",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                const count = serverSettings.domains.length;
                serverSettings.domains = [];
                database.updateServerSettings(interaction.guildId, serverSettings);
                await registerRemoveDomain(interaction.guildId, { data: this.data });

                await interaction.reply({
                    content: `🗑️ **All domains cleared!**\n\nRemoved ${count} ${count === 1 ? 'domain' : 'domains'}.\n\n⚠️ **Warning:** Users cannot verify until you add allowed domains with \`/domain add\`.`,
                    flags: MessageFlags.Ephemeral
                });
            }
        });
    }
};

```

# src\commands\domainrole.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('domainrole')
        .setDescription('Configure domain-specific roles for verification')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a role for a specific email domain')
                .addStringOption(option =>
                    option
                        .setName('domain')
                        .setDescription('Email domain (e.g., @company.com, @*.edu)')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to assign for this domain')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role from a specific email domain')
                .addStringOption(option =>
                    option
                        .setName('domain')
                        .setDescription('Email domain (e.g., @company.com, @*.edu)')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to remove from this domain')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('View all domain-role mappings')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Remove all roles for a specific domain')
                .addStringOption(option =>
                    option
                        .setName('domain')
                        .setDescription('Email domain to clear roles for')
                        .setRequired(true)
                        .setAutocomplete(true)
                )
        )
        .setDefaultMemberPermissions(0),

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        
        await database.getServerSettings(interaction.guildId, async serverSettings => {
            const domains = serverSettings.domains || [];
            
            // Filter domains based on user input
            const filtered = domains
                .filter(domain => domain.toLowerCase().includes(focusedValue))
                .slice(0, 25); // Discord allows max 25 choices
            
            await interaction.respond(
                filtered.map(domain => ({
                    name: domain.replaceAll('*', '✱'),
                    value: domain
                }))
            ).catch(() => {});
        });
    },

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        // Helper to normalize domain format
        const normalizeDomain = (domain) => {
            domain = domain.trim().toLowerCase();
            if (!domain.startsWith('@')) {
                domain = '@' + domain;
            }
            return domain;
        };

        if (subcommand === 'add') {
            let domain = interaction.options.getString('domain', true);
            const role = interaction.options.getRole('role', true);
            
            domain = normalizeDomain(domain);
            
            // Validate domain format
            if (!domain.includes('.')) {
                await interaction.reply({
                    content: "**Invalid domain format!**\n\nDomain must include a dot (e.g., `@company.com`, `@*.edu`).",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            
            if (role.name === "@everyone") {
                await interaction.reply({
                    content: "**Error:** @everyone cannot be used as a domain role!",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                // Initialize domainRoles if needed
                if (!serverSettings.domainRoles) {
                    serverSettings.domainRoles = {};
                }
                
                // Initialize array for this domain if needed
                if (!serverSettings.domainRoles[domain]) {
                    serverSettings.domainRoles[domain] = [];
                }
                
                // Check if role already exists for this domain
                if (serverSettings.domainRoles[domain].includes(role.id)) {
                    await interaction.reply({
                        content: `**${role.name}** is already assigned to \`${domain}\`.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.domainRoles[domain].push(role.id);
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                const totalRoles = serverSettings.domainRoles[domain].length;
                await interaction.reply({
                    content: `**Domain role added!**\n\nDomain: \`${domain}\`\nRole: ${role.name}\n\nUsers verifying with this domain will receive ${totalRoles} role${totalRoles > 1 ? 's' : ''} (plus any default roles).`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'remove') {
            let domain = interaction.options.getString('domain', true);
            const role = interaction.options.getRole('role', true);
            
            domain = normalizeDomain(domain);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!serverSettings.domainRoles || !serverSettings.domainRoles[domain]) {
                    await interaction.reply({
                        content: `**No roles configured for \`${domain}\`.**\n\nUse \`/domainrole list\` to see all domain-role mappings.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const index = serverSettings.domainRoles[domain].indexOf(role.id);
                if (index === -1) {
                    await interaction.reply({
                        content: `**${role.name}** is not assigned to \`${domain}\`.\n\nUse \`/domainrole list\` to see all domain-role mappings.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.domainRoles[domain].splice(index, 1);
                
                // Clean up empty domain entries
                if (serverSettings.domainRoles[domain].length === 0) {
                    delete serverSettings.domainRoles[domain];
                }
                
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Domain role removed!**\n\nDomain: \`${domain}\`\nRole: ${role.name}\n\nUsers verifying with this domain will no longer receive this role.`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'list') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const domainRoles = serverSettings.domainRoles || {};
                const domains = Object.keys(domainRoles);
                
                if (domains.length === 0) {
                    // Show default roles info
                    let message = "**No domain-specific roles configured.**\n\n";
                    if (serverSettings.defaultRoles.length > 0) {
                        const defaultRoleNames = serverSettings.defaultRoles
                            .map(id => {
                                const role = interaction.guild.roles.cache.get(id);
                                return role ? `<@&${id}>` : `Unknown (${id})`;
                            })
                            .join(', ');
                        message += `**Default roles** (all verified users): ${defaultRoleNames}\n\n`;
                    }
                    message += "Use `/domainrole add` to assign specific roles based on email domain.\n\n";
                    message += "**Example:**\n`/domainrole add domain:@company.com role:Employee`\n`/domainrole add domain:@*.edu role:Student`";
                    
                    await interaction.reply({
                        content: message,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                let message = "**Domain-Specific Roles:**\n\n";
                
                for (const domain of domains) {
                    const roleIds = domainRoles[domain];
                    const roleNames = roleIds
                        .map(id => {
                            const role = interaction.guild.roles.cache.get(id);
                            return role ? `<@&${id}>` : `Unknown (${id})`;
                        })
                        .join(', ');
                    
                    message += `\`${domain}\` → ${roleNames}\n`;
                }
                
                // Add default roles info
                if (serverSettings.defaultRoles.length > 0) {
                    const defaultRoleNames = serverSettings.defaultRoles
                        .map(id => {
                            const role = interaction.guild.roles.cache.get(id);
                            return role ? `<@&${id}>` : `Unknown (${id})`;
                        })
                        .join(', ');
                    message += `\n**Default roles** (all domains): ${defaultRoleNames}`;
                }
                
                message += "\n\n*Users receive domain-specific roles + default roles upon verification.*";
                
                await interaction.reply({
                    content: message,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'clear') {
            let domain = interaction.options.getString('domain', true);
            domain = normalizeDomain(domain);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (!serverSettings.domainRoles || !serverSettings.domainRoles[domain]) {
                    await interaction.reply({
                        content: `**No roles configured for \`${domain}\`.**`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const count = serverSettings.domainRoles[domain].length;
                delete serverSettings.domainRoles[domain];
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Cleared all roles for \`${domain}\`!**\n\nRemoved ${count} role${count > 1 ? 's' : ''}.\n\nUsers verifying with this domain will now only receive default roles.`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }
    }
};

```

# src\commands\gemini.js

```js
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { getGeminiResponse } = require("../gemini/getGeminiResponse");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("askai")
        .setDescription("Ask questions about UTM!")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages) // <-- added here
        .addStringOption(option =>
            option.setName("question")
                .setDescription("Your question")
                .setRequired(true)
        ),

    async execute(interaction) {
        const question = interaction.options.getString("question");

        await interaction.deferReply({ ephemeral: false });

        const result = await getGeminiResponse(question);

        if (!result) {
            return interaction.followUp({
                content: "⚠️ I couldn't get a response from Gemini. Please try again.",
                ephemeral: false
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0x5D001A)
            .setTitle("AI Response")
            .setDescription(result.slice(0, 4096))
            .setFooter({ text: "This response was generated by AI and may or may not be accurate" });

        return interaction.followUp({
            embeds: [embed],
            ephemeral: false
        });
    }
};

```

# src\commands\globalstats.js

```js
const { SlashCommandBuilder } = require('@discordjs/builders');
const database = require("../database/Database");
const { MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('globalstats')
        .setDescription('View global server statistics (bot owner only)')
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Type of statistics to view')
                .setRequired(true)
                .addChoices(
                    { name: 'Overview (averages, medians, counts)', value: 'overview' },
                    { name: 'Top 100 by Mails Sent', value: 'top_mails' },
                    { name: 'Top 100 by Verifications', value: 'top_verifications' }
                )
        )
        .addStringOption(option =>
            option
                .setName('period')
                .setDescription('Time period for statistics')
                .setRequired(true)
                .addChoices(
                    { name: 'This Month', value: 'month' },
                    { name: 'All Time', value: 'alltime' }
                )
        )
        .addIntegerOption(option =>
            option
                .setName('pages')
                .setDescription('Number of pages to show for top lists (default: 1, max: 10)')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(10)
        )
        .setDefaultMemberPermissions(0),

    getCurrentMonth() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    },

    async execute(interaction) {
        // Check if the user is the bot owner
        const application = await interaction.client.application.fetch();
        const ownerId = application.owner?.ownerId;

        if (interaction.user.id !== ownerId) {
            await interaction.reply({
                content: "❌ **Access Denied**\n\nThis command is only available to the bot owner.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        try {
            const allStats = await database.getAllGuildStats();
            const type = interaction.options.getString('type');
            const period = interaction.options.getString('period');
            const pages = interaction.options.getInteger('pages') || 1;
            const isMonthly = period === 'month';

            if (allStats.length === 0) {
                await interaction.editReply({
                    content: "📊 No server statistics available yet.",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (type === 'overview') {
                await this.showOverview(interaction, allStats, isMonthly);
            } else if (type === 'top_mails') {
                await this.showTopMails(interaction, allStats, isMonthly, pages);
            } else if (type === 'top_verifications') {
                await this.showTopVerifications(interaction, allStats, isMonthly, pages);
            }
        } catch (error) {
            console.error('Error fetching owner stats:', error);
            await interaction.editReply({
                content: "❌ An error occurred while fetching statistics.",
                flags: MessageFlags.Ephemeral
            });
        }
    },

    getMailsValue(stat, isMonthly) {
        if (isMonthly) {
            // Only count if statsMonth matches current month
            const currentMonth = this.getCurrentMonth();
            if (stat.statsMonth === currentMonth) {
                return stat.mailsSentMonth || 0;
            }
            return 0;
        }
        return stat.mailsSentTotal || 0;
    },

    getVerificationsValue(stat, isMonthly) {
        if (isMonthly) {
            // Only count if statsMonth matches current month
            const currentMonth = this.getCurrentMonth();
            if (stat.statsMonth === currentMonth) {
                return stat.verificationsMonth || 0;
            }
            return 0;
        }
        return stat.verificationsTotal || 0;
    },

    async showOverview(interaction, allStats, isMonthly) {
        const mailsArray = allStats.map(s => this.getMailsValue(s, isMonthly)).sort((a, b) => a - b);
        const verificationsArray = allStats.map(s => this.getVerificationsValue(s, isMonthly)).sort((a, b) => a - b);

        // Calculate totals
        const totalMails = mailsArray.reduce((sum, val) => sum + val, 0);
        const totalVerifications = verificationsArray.reduce((sum, val) => sum + val, 0);

        // Calculate averages
        const avgMails = totalMails / allStats.length;
        const avgVerifications = totalVerifications / allStats.length;

        // Calculate medians
        const medianMails = this.calculateMedian(mailsArray);
        const medianVerifications = this.calculateMedian(verificationsArray);

        // Count servers with at least one verification
        const serversWithVerifications = allStats.filter(s => this.getVerificationsValue(s, isMonthly) >= 1).length;
        const serversWithMails = allStats.filter(s => this.getMailsValue(s, isMonthly) >= 1).length;

        // Get period label for display
        const periodLabel = isMonthly ? 'This Month' : 'All Time';
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonthName = monthNames[new Date().getMonth()];

        const embed = new EmbedBuilder()
            .setTitle(`📊 Global Server Statistics Overview (${isMonthly ? currentMonthName : periodLabel})`)
            .setColor(0x5865F2)
            .addFields(
                {
                    name: '📈 Total Servers with Stats',
                    value: `${allStats.length.toLocaleString()}`,
                    inline: true
                },
                {
                    name: '✅ Servers with ≥1 Verification',
                    value: `${serversWithVerifications.toLocaleString()} (${((serversWithVerifications / allStats.length) * 100).toFixed(1)}%)`,
                    inline: true
                },
                {
                    name: '📧 Servers with ≥1 Mail Sent',
                    value: `${serversWithMails.toLocaleString()} (${((serversWithMails / allStats.length) * 100).toFixed(1)}%)`,
                    inline: true
                },
                {
                    name: '📬 Mails Sent Statistics',
                    value: 
                        `**Total:** ${totalMails.toLocaleString()}\n` +
                        `**Average:** ${avgMails.toFixed(2)}\n` +
                        `**Median:** ${medianMails}`,
                    inline: true
                },
                {
                    name: '✅ Verifications Statistics',
                    value: 
                        `**Total:** ${totalVerifications.toLocaleString()}\n` +
                        `**Average:** ${avgVerifications.toFixed(2)}\n` +
                        `**Median:** ${medianVerifications}`,
                    inline: true
                }
            )
            .setFooter({ text: `${periodLabel} • Data from ${allStats.length} servers` })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    },

    async showTopMails(interaction, allStats, isMonthly, pages) {
        const periodLabel = isMonthly ? 'This Month' : 'All Time';
        const itemsPerPage = 10;
        const maxItems = pages * itemsPerPage;
        
        // Sort by mails sent descending and take top N based on pages
        const sorted = [...allStats]
            .sort((a, b) => this.getMailsValue(b, isMonthly) - this.getMailsValue(a, isMonthly))
            .slice(0, maxItems);

        const embeds = await this.createTopEmbeds(
            interaction,
            sorted,
            `📬 Top ${maxItems} Servers by Mails Sent (${periodLabel})`,
            (stat) => this.getMailsValue(stat, isMonthly),
            'mails sent',
            periodLabel,
            pages
        );

        await interaction.editReply({ embeds, flags: MessageFlags.Ephemeral });
    },

    async showTopVerifications(interaction, allStats, isMonthly, pages) {
        const periodLabel = isMonthly ? 'This Month' : 'All Time';
        const itemsPerPage = 10;
        const maxItems = pages * itemsPerPage;
        
        // Sort by verifications descending and take top N based on pages
        const sorted = [...allStats]
            .sort((a, b) => this.getVerificationsValue(b, isMonthly) - this.getVerificationsValue(a, isMonthly))
            .slice(0, maxItems);

        const embeds = await this.createTopEmbeds(
            interaction,
            sorted,
            `✅ Top ${maxItems} Servers by Verifications (${periodLabel})`,
            (stat) => this.getVerificationsValue(stat, isMonthly),
            'verifications',
            periodLabel,
            pages
        );

        await interaction.editReply({ embeds, flags: MessageFlags.Ephemeral });
    },

    async createTopEmbeds(interaction, sortedStats, title, getValue, label, periodLabel, maxPages) {
        const embeds = [];
        const itemsPerEmbed = 10;

        for (let i = 0; i < sortedStats.length; i += itemsPerEmbed) {
            const chunk = sortedStats.slice(i, i + itemsPerEmbed);
            const embed = new EmbedBuilder()
                .setTitle(i === 0 ? title : `${title} (cont.)`)
                .setColor(0x5865F2);

            let description = '';
            for (let j = 0; j < chunk.length; j++) {
                const stat = chunk[j];
                const rank = i + j + 1;
                const value = getValue(stat);
                
                // Try to get guild name and truncate if too long
                let guildName = 'Unknown Server';
                try {
                    const guild = interaction.client.guilds.cache.get(stat.guildID);
                    if (guild) {
                        guildName = guild.name.length > 30 ? guild.name.substring(0, 27) + '...' : guild.name;
                    }
                } catch {
                    // Keep default
                }

                description += `**${rank}.** ${guildName} — ${value.toLocaleString()} ${label}\n`;
            }

            embed.setDescription(description || 'No data');
            embed.setFooter({ text: `${periodLabel} • Showing ${i + 1}-${Math.min(i + itemsPerEmbed, sortedStats.length)} of ${sortedStats.length}` });
            embeds.push(embed);
        }

        return embeds.slice(0, maxPages); // Limit to requested pages (max 10 per Discord)
    },

    calculateMedian(sortedArray) {
        if (sortedArray.length === 0) return 0;
        const mid = Math.floor(sortedArray.length / 2);
        if (sortedArray.length % 2 === 0) {
            return ((sortedArray[mid - 1] + sortedArray[mid]) / 2).toFixed(2);
        }
        return sortedArray[mid];
    }
};

```

# src\commands\help.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('help')
        .setDescription('Learn how to set up and use the email verification bot')
        .setDefaultMemberPermissions(0),
    
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('📚 Email Verification Bot - Setup Guide')
            .setDescription('Follow these steps to set up email verification for your server.')
            .setColor(0x5865F2)
            .addFields(
                {
                    name: '🚀 Quick Setup (4 Steps)',
                    value: 
                        '**1.** `/role add <role>` - Add a default role for verified users\n' +
                        '**2.** `/domain add <domains>` - Add allowed email domains\n' +
                        '**3.** `/button <channel>` - Create verification embed\n' +
                        '**4.** `/status` - Verify everything is configured'
                },
                {
                    name: '👥 Role Configuration',
                    value:
                        '`/role add` - Add a default role (given to all verified users)\n' +
                        '`/role remove` - Remove a default role\n' +
                        '`/role list` - View all default roles\n' +
                        '`/role unverified` - Set/view optional role for unverified members'
                },
                {
                    name: '🎭 Domain-Specific Roles',
                    value:
                        '`/domainrole add` - Assign roles for specific email domains\n' +
                        '`/domainrole remove` - Remove a role from a domain\n' +
                        '`/domainrole list` - View all domain-role mappings\n' +
                        '`/domainrole clear` - Remove all roles for a domain\n' +
                        '*Users get domain roles + default roles on verification*'
                },
                {
                    name: '📧 Domain Management',
                    value:
                        '`/domain add` - Add allowed domains (use `*` wildcard, e.g. `@*.edu`)\n' +
                        '`/domain remove` - Remove allowed domains\n' +
                        '`/domain list` - View all allowed domains\n' +
                        '`/domain clear` - Remove all allowed domains'
                },
                {
                    name: '🚫 Blacklist Management',
                    value:
                        '`/blacklist add` - Block patterns (use `*` wildcard, e.g. `*@tempmail.*`)\n' +
                        '`/blacklist remove` - Unblock patterns\n' +
                        '`/blacklist list` - View all blacklisted entries\n' +
                        '`/blacklist clear` - Remove all blacklist entries'
                },
                {
                    name: '⚙️ Settings',
                    value:
                        '`/settings language` - Change bot language\n' +
                        '`/settings log-channel` - Set verification log channel\n' +
                        '`/settings verify-message` - Custom message in emails\n' +
                        '`/settings auto-verify` - Auto-prompt new members\n' +
                        '`/settings auto-unverified` - Auto-assign unverified role'
                },
                {
                    name: '🛡️ Moderation',
                    value:
                        '`/manualverify` - Manually verify a user without email\n' +
                        '`/set_error_notify` - Configure error notifications'
                },
                {
                    name: '📊 Information',
                    value:
                        '`/status` - View configuration & statistics\n' +
                        '`/help` - Show this help message'
                },
                {
                    name: '👤 User Commands',
                    value:
                        '`/verify` - Start email verification process\n' +
                        '`/data delete-user` - Delete your verification data'
                },
                {
                    name: '⚠️ Danger Zone',
                    value:
                        '`/data delete-server` - Delete all data & remove bot'
                }
            )
            .setFooter({ text: 'Need more help? Visit emailbot.larskaesberg.de' });

        await interaction.reply({
            embeds: [helpEmbed],
            flags: MessageFlags.Ephemeral
        });
    }
};

```

# src\commands\listchannel.js

```js
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { getChannelDetails } = require('../telegram/ChannelManager');

module.exports = {
    definition: {
        name: 'listchannels',
        description: 'List all Telegram channels currently being scraped. (Admin only)',
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const channels = await getChannelDetails();

        if (channels.length === 0) {
            return interaction.editReply(
                `📭 No Telegram channels are currently being scraped.\n` +
                `Use **/addchannel** to add one.`
            );
        }

        const state = require('../shared/state');
        const { updateChannelName } = require('../telegram/ChannelManager');

        const rows = await Promise.all(channels.map(async (ch, i) => {
            const addedAt = new Date(ch.added_at).toLocaleDateString('en-MY', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            
            let title = ch.channel_name;
            if (!title && state.telegramClient) {
                try {
                    let parsedId = ch.channel_id;
                    if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;
                    
                    const targetId = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
                    const entity = await state.telegramClient.getEntity(targetId);
                    title = entity.title || entity.username;
                    
                    if (title) {
                        await updateChannelName(ch.channel_id, title).catch(() => {});
                    }
                } catch (err) {
                    // Ignore resolution errors
                }
            }
            title = title || 'Unknown Channel';
            
            return `**${i + 1}.** ${title} (\`${ch.channel_id}\`)\n└ Added by ${ch.added_by} on ${addedAt}`;
        }));

        const embed = new EmbedBuilder()
            .setTitle(`📡 Tracked Telegram Channels (${channels.length})`)
            .setDescription(rows.join('\n\n'))
            .setColor(0x3498db)
            .setFooter({ text: 'Use /addchannel or /removechannel to manage this list.' })
            .setTimestamp();

        return interaction.editReply({ embeds: [embed] });
    },
};


```

# src\commands\manualverify.js

```js
const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageFlags} = require('discord.js');
const database = require("../database/Database.js");
const {getLocale} = require("../Language");
const md5hash = require("../crypto/Crypto");
const EmailUser = require("../database/EmailUser");
const ErrorNotifier = require("../utils/ErrorNotifier");

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('manualverify')
        .setDescription('Bypass email verification and manually verify a user (Admin only)')
        .addUserOption(option => option
            .setName('user')
            .setDescription('The member to verify - they will receive the verified role')
            .setRequired(true))
        .addStringOption(option => option
            .setName('email')
            .setDescription('Email address to associate')
            .setRequired(true))
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const email = interaction.options.getString('email').trim().toLowerCase();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            if (!serverSettings.status) {
                await ErrorNotifier.notify({
                    guild: interaction.guild,
                    errorTitle: getLocale(serverSettings.language, 'errorBotNotConfiguredTitle'),
                    errorMessage: getLocale(serverSettings.language, 'errorBotNotConfiguredMessage'),
                    user: interaction.user,
                    interaction: interaction,
                    language: serverSettings.language
                });
                return;
            }

            const roleVerified = interaction.guild.roles.cache.find(role => role.id === serverSettings.verifiedRoleName);
            const roleUnverified = interaction.guild.roles.cache.find(role => role.id === serverSettings.unverifiedRoleName);

            if (!roleVerified) {
                await interaction.reply({
                    content: "❌ **Verified role not found!**\n\nPlease set a verified role first using `/role verified`",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            const emailHash = md5hash(email);

            // Check if another user already has this email and unverify them
            database.getEmailUser(emailHash, interaction.guildId, async (currentUserEmail) => {
                if (currentUserEmail && currentUserEmail.userID !== targetUser.id) {
                    let member = await interaction.guild.members.fetch(currentUserEmail.userID).catch(() => null);
                    if (member) {
                        try {
                            await member.roles.remove(roleVerified);
                            if (roleUnverified) {
                                await member.roles.add(roleUnverified);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                        try {
                            await member.send("You got unverified on " + interaction.guild.name + " because somebody else used that email!").catch(() => {});
                        } catch {}
                    }
                }
            });

            // Update the database with the new user
            database.updateEmailUser(new EmailUser(emailHash, targetUser.id, interaction.guildId, serverSettings.verifiedRoleName, 0));

            // Assign roles to the target user
            try {
                const verifyMember = await interaction.guild.members.fetch(targetUser.id);
                await verifyMember.roles.add(roleVerified);
                if (serverSettings.unverifiedRoleName !== "" && roleUnverified) {
                    await verifyMember.roles.remove(roleUnverified).catch(() => {});
                }
            } catch (e) {
                await interaction.reply({
                    content: `Failed to assign role to user. Make sure the user is in the server and the bot has proper permissions.\nError: ${e.message}`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            // Log to the log channel if configured
            try {
                if (serverSettings.logChannel !== "") {
                    interaction.guild.channels.cache.get(serverSettings.logChannel).send(
                        `🔧 <@${targetUser.id}> → \`${email}\` (by <@${interaction.user.id}>)`
                    ).catch(() => {});
                }
            } catch {}

            await interaction.reply({
                content: `✅ **Manual verification complete!**\n\n👤 **User:** <@${targetUser.id}>\n📧 **Email:** \`${email}\`\n🎭 **Role:** <@&${roleVerified.id}>`,
                flags: MessageFlags.Ephemeral
            });
        });
    }
};


```

# src\commands\removechannel.js

```js
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { channelExists, removeChannel } = require('../telegram/ChannelManager');

module.exports = {
    definition: {
        name: 'removechannel',
        description: 'Remove a Telegram channel from the scrape list. (Admin only)',
        options: [
            {
                name: 'channel_id',
                description: 'The numeric Telegram channel ID to remove (use /listchannels to find it)',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        let inputId = interaction.options.getString('channel_id').trim();

        // Sanitize legacy positive IDs
        if (/^\d+$/.test(inputId)) {
            inputId = '-100' + inputId;
        }

        const exists = await channelExists(inputId);
        if (!exists) {
            return interaction.editReply(
                `❌ No channel with ID \`${inputId}\` found in the scrape list.\n` +
                `Use **/listchannels** to see what's currently tracked.`
            );
        }

        await removeChannel(inputId);

        return interaction.editReply(
            `✅ Channel \`${inputId}\` has been removed from the scrape list.\n` +
            `It will be excluded from future scrape cycles.`
        );
    },
};

```

# src\commands\role.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Configure verification roles for your server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a default role given to all verified users')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to add to the default roles list')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a role from the default roles list')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to remove from the default roles list')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('View all default roles assigned to verified users')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unverified')
                .setDescription('Set an optional role for unverified members (can be auto-assigned on join)')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role for unverified members (select current role to disable)')
                        .setRequired(false)
                )
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'add') {
            const role = interaction.options.getRole('role', true);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (role.name === "@everyone") {
                    await interaction.reply({
                        content: "**Error:** @everyone cannot be used as a verified role!",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                // Check if role is already in the list
                if (serverSettings.defaultRoles.includes(role.id)) {
                    await interaction.reply({
                        content: `**${role.name}** is already a default role.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.defaultRoles.push(role.id);
                // Also update legacy field for backward compatibility
                if (serverSettings.defaultRoles.length === 1) {
                    serverSettings.verifiedRoleName = role.id;
                }
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Default role added:** ${role.name}\n\nAll verified users will now receive this role.\n*Use \`/role list\` to see all default roles.*`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'remove') {
            const role = interaction.options.getRole('role', true);
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                const index = serverSettings.defaultRoles.indexOf(role.id);
                if (index === -1) {
                    await interaction.reply({
                        content: `**${role.name}** is not in the default roles list.\n\nUse \`/role list\` to see current default roles.`,
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                serverSettings.defaultRoles.splice(index, 1);
                // Update legacy field
                if (serverSettings.defaultRoles.length > 0) {
                    serverSettings.verifiedRoleName = serverSettings.defaultRoles[0];
                } else {
                    serverSettings.verifiedRoleName = "";
                }
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `**Default role removed:** ${role.name}\n\nVerified users will no longer receive this role automatically.`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'list') {
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (serverSettings.defaultRoles.length === 0) {
                    await interaction.reply({
                        content: "**No default roles configured!**\n\nUse `/role add` to add roles that all verified users will receive.\n\n*Tip: You can also use `/domainrole` to assign different roles based on email domain.*",
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }
                
                const roleNames = serverSettings.defaultRoles
                    .map(id => {
                        const role = interaction.guild.roles.cache.get(id);
                        return role ? `<@&${id}>` : `Unknown (${id})`;
                    })
                    .join('\n');
                
                await interaction.reply({
                    content: `**Default Roles** (assigned to all verified users):\n${roleNames}\n\n*Use \`/role add\` or \`/role remove\` to modify.\nUse \`/domainrole\` to assign additional roles based on email domain.*`,
                    flags: MessageFlags.Ephemeral
                });
            });
        }

        if (subcommand === 'unverified') {
            const unverifiedRole = interaction.options.getRole('role');
            
            await database.getServerSettings(interaction.guildId, async serverSettings => {
                if (unverifiedRole == null) {
                    const role = interaction.guild.roles.cache.find(r => r.id === serverSettings.unverifiedRoleName);
                    if (role === undefined) {
                        await interaction.reply({
                            content: "**Unverified role is disabled.**\n\nYou can set one with `/role unverified` to restrict access for new members until they verify.",
                            flags: MessageFlags.Ephemeral
                        });
                        return;
                    }
                    await interaction.reply({
                        content: `**Unverified role:** ${role.name}\n\nThis role is removed when users complete verification.\n*Tip: Select this same role again to disable the unverified role feature.*`,
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    if (unverifiedRole.name === "@everyone") {
                        await interaction.reply({
                            content: "**Error:** @everyone cannot be used as the unverified role!",
                            flags: MessageFlags.Ephemeral
                        });
                        return;
                    }
                    
                    // Toggle off if selecting the current role
                    if (unverifiedRole.id === serverSettings.unverifiedRoleName) {
                        serverSettings.unverifiedRoleName = "";
                        database.updateServerSettings(interaction.guildId, serverSettings);
                        await interaction.reply({
                            content: "**Unverified role disabled.**\n\nNew members will no longer receive a special role before verification.",
                            flags: MessageFlags.Ephemeral
                        });
                    } else {
                        serverSettings.unverifiedRoleName = unverifiedRole.id;
                        database.updateServerSettings(interaction.guildId, serverSettings);
                        await interaction.reply({
                            content: `**Unverified role set to:** ${unverifiedRole.name}\n\nThis role will be removed when users complete email verification.\n*Tip: Use \`/settings auto-unverified\` to auto-assign this role to new members.*`,
                            flags: MessageFlags.Ephemeral
                        });
                    }
                }
            });
        }
    }
};

```

# src\commands\scrape.js

```js
const { PermissionsBitField, ApplicationCommandOptionType } = require('discord.js');
const { runScrape, startScrapeCron, stopScrapeCron, isScrapeCronActive } = require('../telegram/TelegramListener');
const { getChannelDetails, clearSeenMessages } = require('../telegram/ChannelManager');
const state = require('../shared/state');

module.exports = {
    definition: {
        name: 'scrape',
        description: 'Manage Telegram scraping. (Admin only)',
        options: [
            {
                name: 'action',
                description: 'What to do: run a scrape now, start auto-scraping, or stop it.',
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    { name: '▶️  Run now — scrape once immediately',        value: 'run'   },
                    { name: '🔁  Start auto — enable scheduled scraping',   value: 'start' },
                    { name: '⏹️  Stop auto — disable scheduled scraping',   value: 'stop'  },
                ],
            },
            {
                name: 'channel',
                description: 'Optional. Scrape only a specific channel (used with "run").',
                type: ApplicationCommandOptionType.String,
                required: false,
                autocomplete: true,
            },
            {
                name: 'force',
                description: 'Optional. Bypass the seen-messages check (used with "run").',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
            {
                name: 'cleardb',
                description: 'Optional. Clear the seen_messages database only (no scrape is run).',
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
        ],
    },

    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused().toLowerCase();
        try {
            const channels = await getChannelDetails();
            const choices = channels.map(ch => ({
                name: `${ch.channel_name || 'Unknown'} (${ch.channel_id})`,
                value: ch.channel_id,
            }));
            const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue));
            await interaction.respond(filtered.slice(0, 25));
        } catch {
            await interaction.respond([]);
        }
    },

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                ephemeral: true,
            });
        }

        const action        = interaction.options.getString('action') || 'run';
        const targetChannelId = interaction.options.getString('channel');
        const force           = interaction.options.getBoolean('force')   || false;
        const cleardb         = interaction.options.getBoolean('cleardb') || false;

        // ── cleardb mode (independent of action) ─────────────────────────────
        if (cleardb) {
            await interaction.deferReply({ ephemeral: true });
            try {
                const deleted = await clearSeenMessages();
                return interaction.editReply(
                    `🗑️ **Seen messages database cleared!** Removed ${deleted} entr${deleted === 1 ? 'y' : 'ies'}.\n` +
                    `Run \`/scrape\` to start a fresh scrape cycle.`
                );
            } catch (err) {
                console.error('[ScrapeCommand] cleardb error:', err);
                return interaction.editReply('❌ Failed to clear the seen messages database.');
            }
        }

        // ── stop ──────────────────────────────────────────────────────────────
        if (action === 'stop') {
            const stopped = stopScrapeCron();
            return interaction.reply({
                content: stopped
                    ? '⏹️ **Auto-scraping stopped.** The scheduled cron has been cancelled.\nYou can still run `/scrape` manually at any time.'
                    : '⚠️ Auto-scraping is not currently running — nothing to stop.',
                ephemeral: true,
            });
        }

        // ── start (enable cron schedule) ──────────────────────────────────────
        if (action === 'start') {
            if (!state.telegramClient) {
                return interaction.reply({
                    content: '❌ Telegram client is not connected yet. Please wait a moment and try again.',
                    ephemeral: true,
                });
            }
            const started = startScrapeCron(interaction.client);
            return interaction.reply({
                content: started
                    ? `🔁 **Auto-scraping enabled!** The bot will now scrape on the configured interval.\nUse \`/scrape action:Stop auto\` to cancel.`
                    : '⚠️ Auto-scraping is already running.',
                ephemeral: true,
            });
        }

        // ── run (one-shot scrape) ─────────────────────────────────────────────
        if (!state.telegramClient) {
            return interaction.reply({
                content: '❌ Telegram client is not connected yet. Please wait a moment and try again.',
                ephemeral: true,
            });
        }

        if (state.isScraping) {
            return interaction.reply({
                content: '⚠️ A scrape cycle is already running in the background.',
                ephemeral: true,
            });
        }

        // Defer since scraping can take a while
        await interaction.deferReply({ ephemeral: true });

        try {
            const result = await runScrape(interaction.client, { targetChannelId, force });

            if (result.skipped) {
                return interaction.editReply('⚠️ Scrape skipped — already running.');
            }
            if (result.error) {
                return interaction.editReply(`❌ Scrape failed: ${result.error}`);
            }

            const cronStatus = isScrapeCronActive()
                ? `\n_Auto-scraping is **enabled** — the bot will continue scraping on its schedule._`
                : `\n_Auto-scraping is **disabled**. Use \`/scrape action:Start auto\` to enable it._`;

            return interaction.editReply(
                `✅ **Scrape complete!**\n` +
                `- Channels Scraped: ${result.channelsScraped}\n` +
                `- Messages Sent to Gemini: ${result.totalGemini}\n` +
                `- Events Found & Posted: ${result.totalEvents}` +
                cronStatus
            );
        } catch (error) {
            console.error('[ScrapeCommand] Error:', error);
            return interaction.editReply('❌ An unexpected error occurred during the scrape.');
        }
    },
};

```

# src\commands\setErrorNotify.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const database = require("../database/Database");
const { MessageFlags, EmbedBuilder } = require('discord.js');
const { getLocale } = require('../Language');

module.exports = {
    data: new SlashCommandBuilder()
        .setDefaultPermission(true)
        .setName('set_error_notify')
        .setDescription('Configure where bot error notifications are sent')
        .addSubcommand(subcommand =>
            subcommand
                .setName('owner')
                .setDescription('Send error notifications to the server owner (default)')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Send error notifications to a specific channel')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel to send error notifications to')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Send error notifications to a specific user via DM')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to send error notifications to')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Show current error notification settings')
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            const language = serverSettings.language || 'english';

            if (subcommand === 'status') {
                const embed = await this.createStatusEmbed(interaction, serverSettings, language);
                await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
                return;
            }

            if (subcommand === 'owner') {
                serverSettings.errorNotifyType = 'owner';
                serverSettings.errorNotifyTarget = '';
                database.updateServerSettings(interaction.guildId, serverSettings);
                await interaction.reply({
                    content: getLocale(language, 'errorNotifySetOwner'),
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (subcommand === 'channel') {
                const channel = interaction.options.getChannel('channel');
                
                // Verify the channel is a text channel
                if (!channel.isTextBased()) {
                    await interaction.reply({
                        content: getLocale(language, 'errorNotifyInvalidChannel'),
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                serverSettings.errorNotifyType = 'channel';
                serverSettings.errorNotifyTarget = channel.id;
                database.updateServerSettings(interaction.guildId, serverSettings);
                await interaction.reply({
                    content: getLocale(language, 'errorNotifySetChannel', channel.name),
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (subcommand === 'user') {
                const user = interaction.options.getUser('user');
                
                // Verify the user is a member of the guild
                const member = await interaction.guild.members.fetch(user.id).catch(() => null);
                if (!member) {
                    await interaction.reply({
                        content: getLocale(language, 'errorNotifyUserNotInGuild'),
                        flags: MessageFlags.Ephemeral
                    });
                    return;
                }

                serverSettings.errorNotifyType = 'user';
                serverSettings.errorNotifyTarget = user.id;
                database.updateServerSettings(interaction.guildId, serverSettings);
                await interaction.reply({
                    content: getLocale(language, 'errorNotifySetUser', user.tag || user.username),
                    flags: MessageFlags.Ephemeral
                });
                return;
            }
        });
    },

    async createStatusEmbed(interaction, serverSettings, language) {
        const embed = new EmbedBuilder()
            .setTitle(getLocale(language, 'errorNotifyStatusTitle'))
            .setColor(0x5865F2)
            .setTimestamp();

        const notifyType = serverSettings.errorNotifyType || 'owner';
        const notifyTarget = serverSettings.errorNotifyTarget || '';

        let statusText = '';
        if (notifyType === 'owner') {
            const owner = await interaction.guild.fetchOwner().catch(() => null);
            statusText = getLocale(language, 'errorNotifyStatusOwner', owner ? (owner.user.tag || owner.user.username) : 'Unknown');
        } else if (notifyType === 'channel') {
            const channel = interaction.guild.channels.cache.get(notifyTarget);
            if (channel) {
                statusText = getLocale(language, 'errorNotifyStatusChannel', channel.name);
            } else {
                statusText = getLocale(language, 'errorNotifyStatusChannelInvalid');
            }
        } else if (notifyType === 'user') {
            const member = await interaction.guild.members.fetch(notifyTarget).catch(() => null);
            if (member) {
                statusText = getLocale(language, 'errorNotifyStatusUser', member.user.tag || member.user.username);
            } else {
                statusText = getLocale(language, 'errorNotifyStatusUserInvalid');
            }
        }

        embed.setDescription(statusText);
        embed.addFields({
            name: getLocale(language, 'errorNotifyStatusNote'),
            value: getLocale(language, 'errorNotifyStatusNoteValue'),
            inline: false
        });

        return embed;
    }
};


```

# src\commands\settings.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageFlags } = require('discord.js');
const database = require("../database/Database.js");
const { languages } = require("../Language");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure bot settings for your server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('language')
                .setDescription('Change the language for bot messages and verification prompts')
                .addStringOption(option =>
                    option
                        .setName('language')
                        .setDescription('Select a language')
                        .setRequired(true)
                        .addChoices(...[...languages.keys()].map(value => ({
                            name: value.charAt(0).toUpperCase() + value.slice(1),
                            value: value
                        })))
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('log-channel')
                .setDescription('Set a channel to log verification events')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Channel for verification logs (leave empty to disable)')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('verify-message')
                .setDescription('Customize the message shown in verification emails')
                .addStringOption(option =>
                    option
                        .setName('message')
                        .setDescription('Custom message for verification emails (leave empty to use default)')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('auto-verify')
                .setDescription('Automatically prompt new members to verify when they join')
                .addBooleanOption(option =>
                    option
                        .setName('enable')
                        .setDescription('Enable or disable auto-verify prompts for new members')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('auto-unverified')
                .setDescription('Automatically assign the unverified role to new members')
                .addBooleanOption(option =>
                    option
                        .setName('enable')
                        .setDescription('Enable or disable auto-assignment of unverified role')
                        .setRequired(true)
                )
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await database.getServerSettings(interaction.guildId, async serverSettings => {
            if (subcommand === 'language') {
                const language = interaction.options.getString('language', true);
                serverSettings.language = language;
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                await interaction.reply({
                    content: `🌐 **Language changed to:** ${language.charAt(0).toUpperCase() + language.slice(1)}\n\nAll bot messages will now be displayed in this language.`,
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            if (subcommand === 'log-channel') {
                const logChannel = interaction.options.getChannel('channel');
                
                if (!logChannel) {
                    serverSettings.logChannel = "";
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: "📝 **Verification logging disabled.**\n\nVerification events will no longer be logged to a channel.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    serverSettings.logChannel = logChannel.id;
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: `📝 **Log channel set to:** <#${logChannel.id}>\n\nVerification events will be logged to this channel, including:\n• User email verifications\n• Manual verifications by admins`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'verify-message') {
                const verifyMessage = interaction.options.getString('message');
                
                if (!verifyMessage) {
                    serverSettings.verifyMessage = "";
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: "✉️ **Custom verify message removed.**\n\nVerification emails will now use the default message.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    serverSettings.verifyMessage = verifyMessage;
                    database.updateServerSettings(interaction.guildId, serverSettings);
                    await interaction.reply({
                        content: `✉️ **Custom verify message set:**\n"${verifyMessage}"\n\nThis message will be included in verification emails sent to users.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'auto-verify') {
                const enable = interaction.options.getBoolean('enable', true);
                serverSettings.autoVerify = +enable;
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                if (enable) {
                    await interaction.reply({
                        content: "✅ **Auto-verify enabled!**\n\nNew members will automatically receive a verification prompt when they join the server.",
                        flags: MessageFlags.Ephemeral
                    });
                } else {
                    await interaction.reply({
                        content: "❌ **Auto-verify disabled.**\n\nNew members will need to use `/verify` or click a verification button to start the verification process.",
                        flags: MessageFlags.Ephemeral
                    });
                }
                return;
            }

            if (subcommand === 'auto-unverified') {
                const enable = interaction.options.getBoolean('enable', true);
                serverSettings.autoAddUnverified = +enable;
                database.updateServerSettings(interaction.guildId, serverSettings);
                
                if (enable) {
                    const roleUnverified = interaction.guild.roles.cache.find(r => r.id === serverSettings.unverifiedRoleName);
                    if (roleUnverified) {
                        await interaction.reply({
                            content: `✅ **Auto-assign unverified role enabled!**\n\nNew members will automatically receive the **${roleUnverified.name}** role when they join.`,
                            flags: MessageFlags.Ephemeral
                        });
                    } else {
                        await interaction.reply({
                            content: "✅ **Auto-assign unverified role enabled!**\n\n⚠️ **Warning:** No unverified role is configured. Use `/role unverified` to set one first.",
                            flags: MessageFlags.Ephemeral
                        });
                    }
                } else {
                    await interaction.reply({
                        content: "❌ **Auto-assign unverified role disabled.**\n\nNew members will not automatically receive the unverified role.",
                        flags: MessageFlags.Ephemeral
                    });
                }
            }
        });
    }
};

```

# src\commands\status.js

```js
const {SlashCommandBuilder} = require('@discordjs/builders');
const database = require("../database/Database");
const { MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setDefaultPermission(true).setName('status').setDescription('View bot configuration, verification statistics, and check setup issues').setDefaultMemberPermissions(0),
    
    async getErrorNotifyStatus(guild, serverSettings) {
        const notifyType = serverSettings.errorNotifyType || 'owner';
        const notifyTarget = serverSettings.errorNotifyTarget || '';
        
        if (notifyType === 'owner') {
            const owner = await guild.fetchOwner().catch(() => null);
            return `📤 Sent to: **Server Owner** ${owner ? `(<@${owner.id}>)` : ''} via DM`;
        } else if (notifyType === 'channel') {
            const channel = guild.channels.cache.get(notifyTarget);
            if (channel) {
                return `📤 Sent to: **Channel** <#${channel.id}>`;
            } else {
                return `⚠️ Sent to: **Channel** (not found - will fallback to owner)`;
            }
        } else if (notifyType === 'user') {
            const member = await guild.members.fetch(notifyTarget).catch(() => null);
            if (member) {
                return `📤 Sent to: **User** <@${member.id}> via DM`;
            } else {
                return `⚠️ Sent to: **User** (not found - will fallback to owner)`;
            }
        }
        return '*Default (owner)*';
    },
    
    async execute(interaction) {
        await database.getServerSettings(interaction.guildId, async serverSettings => {
            // Get guild statistics
            database.getGuildStats(interaction.guildId, async (guildStats) => {
                const isConfigured = serverSettings.status
                
                // Check default roles
                const defaultRoles = serverSettings.defaultRoles || []
                const validDefaultRoles = defaultRoles
                    .map(id => interaction.guild.roles.cache.get(id))
                    .filter(role => role !== undefined)
                
                // Check domain roles
                const domainRoles = serverSettings.domainRoles || {}
                const domainRoleEntries = Object.entries(domainRoles)
                
                // Check unverified role
                const roleUnverified = interaction.guild.roles.cache.find(r => r.id === serverSettings.unverifiedRoleName)
                
                // Check log channel
                const logChannel = serverSettings.logChannel ? interaction.guild.channels.cache.get(serverSettings.logChannel) : null
                
                // Format domains
                const domainsDisplay = serverSettings.domains.length > 0 
                    ? serverSettings.domains.map(d => `\`${d.replaceAll("*", "✱")}\``).join(', ')
                    : '*None configured*'
                
                // Format blacklist
                const blacklistDisplay = serverSettings.blacklist.length > 0
                    ? serverSettings.blacklist.map(b => `\`${b}\``).join(', ')
                    : '*None*'
                
                // Format default roles
                const defaultRolesDisplay = validDefaultRoles.length > 0
                    ? validDefaultRoles.map(r => `<@&${r.id}>`).join(', ')
                    : '❌ *None set*'
                
                // Format domain-specific roles
                let domainRolesDisplay = '*None configured*'
                if (domainRoleEntries.length > 0) {
                    domainRolesDisplay = domainRoleEntries.map(([domain, roleIds]) => {
                        const roles = roleIds
                            .map(id => interaction.guild.roles.cache.get(id))
                            .filter(r => r)
                            .map(r => `<@&${r.id}>`)
                            .join(', ')
                        return `\`${domain.replaceAll("*", "✱")}\` → ${roles || '*invalid roles*'}`
                    }).join('\n')
                }
                
                // Determine status color and icon
                const statusColor = isConfigured ? 0x57F287 : 0xED4245
                const statusIcon = isConfigured ? '✅' : '❌'
                const statusText = isConfigured ? 'Ready' : 'Not Configured'
                
                // Build issues list
                const issues = []
                const hasAnyRoles = validDefaultRoles.length > 0 || domainRoleEntries.length > 0
                if (!hasAnyRoles) issues.push('• No verified roles configured (use `/role add` or `/domainrole add`)')
                if (serverSettings.domains.length === 0) issues.push('• No email domains configured')
                
                // Get current month name for display
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                    'July', 'August', 'September', 'October', 'November', 'December']
                const currentMonth = monthNames[new Date().getMonth()]
                
                const statusEmbed = new EmbedBuilder()
                    .setTitle(`📊 Bot Status - ${statusIcon} ${statusText}`)
                    .setColor(statusColor)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .addFields(
                        {
                            name: '🎭 Default Roles (all verified users)',
                            value: defaultRolesDisplay,
                            inline: false
                        },
                        {
                            name: '🔗 Domain-Specific Roles',
                            value: domainRolesDisplay,
                            inline: false
                        },
                        {
                            name: '👤 Unverified Role',
                            value: roleUnverified ? `<@&${roleUnverified.id}>` : '➖ *Disabled*',
                            inline: true
                        },
                        {
                            name: '🌐 Language',
                            value: `${serverSettings.language || 'english'}`,
                            inline: true
                        },
                        {
                            name: '📝 Log Channel',
                            value: logChannel ? `<#${logChannel.id}>` : '*Disabled*',
                            inline: true
                        },
                        {
                            name: '📧 Allowed Domains',
                            value: domainsDisplay
                        },
                        {
                            name: '🚫 Blacklisted Emails',
                            value: blacklistDisplay
                        },
                        {
                            name: '📬 Emails Sent',
                            value: 
                                `**${currentMonth}:** ${guildStats.mailsSentMonth.toLocaleString()}\n` +
                                `**Total:** ${guildStats.mailsSentTotal.toLocaleString()}`,
                            inline: true
                        },
                        {
                            name: '✅ Successful Verifications',
                            value: 
                                `**${currentMonth}:** ${guildStats.verificationsMonth.toLocaleString()}\n` +
                                `**Total:** ${guildStats.verificationsTotal.toLocaleString()}`,
                            inline: true
                        },
                        {
                            name: '⚙️ Auto Settings',
                            value: 
                                `**Auto-verify on join:** ${serverSettings.autoVerify ? '✅ Enabled' : '❌ Disabled'}\n` +
                                `**Auto-add unverified role:** ${serverSettings.autoAddUnverified ? '✅ Enabled' : '❌ Disabled'}`,
                            inline: false
                        },
                        {
                            name: '🔔 Error Notifications',
                            value: await this.getErrorNotifyStatus(interaction.guild, serverSettings),
                            inline: false
                        },
                        {
                            name: '💬 Custom Verify Message',
                            value: serverSettings.verifyMessage ? `"${serverSettings.verifyMessage}"` : '*Default message*'
                        }
                    )
                
                // Add issues field if there are problems
                if (issues.length > 0) {
                    statusEmbed.addFields({
                        name: '⚠️ Issues to Fix',
                        value: issues.join('\n')
                    })
                }
                
                statusEmbed.setFooter({ 
                    text: `Server: ${interaction.guild.name}`,
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                })
                
                await interaction.reply({ embeds: [statusEmbed], flags: MessageFlags.Ephemeral })
            })
        })
    }
}

```

# src\commands\tgblacklist.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField, MessageFlags, EmbedBuilder } = require('discord.js');
const { getKeywordBlacklist, addKeywordToBlacklist, removeKeywordFromBlacklist, clearKeywordBlacklist } = require('../telegram/KeywordBlacklistManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tgblacklist')
        .setDescription('Manage the Telegram event scraper keyword blacklist. (Admin only)')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a keyword to the blacklist (case-insensitive)')
                .addStringOption(option =>
                    option
                        .setName('keyword')
                        .setDescription('The keyword to block')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a keyword from the blacklist')
                .addStringOption(option =>
                    option
                        .setName('keyword')
                        .setDescription('The keyword to remove')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('List all blacklisted keywords')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clear all blacklisted keywords')
        )
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        if (!interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({
                content: '❌ You need **Administrator** permission to use this command.',
                flags: MessageFlags.Ephemeral
            });
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'list') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const list = await getKeywordBlacklist();
                if (list.length === 0) {
                    return interaction.editReply('🚫 **No keywords are currently blacklisted for the Telegram scraper.**');
                }
                const embed = new EmbedBuilder()
                    .setTitle(`🚫 Telegram Scraper Keyword Blacklist (${list.length})`)
                    .setDescription(list.map((kw, i) => `**${i + 1}.** \`${kw}\``).join('\n'))
                    .setColor(0xe74c3c)
                    .setTimestamp();
                return interaction.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('[tgblacklist] list error:', err);
                return interaction.editReply('❌ Failed to retrieve the blacklist.');
            }
        }

        if (subcommand === 'add') {
            const keyword = interaction.options.getString('keyword').trim();
            if (!keyword) {
                return interaction.reply({ content: '❌ Keyword cannot be empty.', flags: MessageFlags.Ephemeral });
            }
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const added = await addKeywordToBlacklist(keyword, interaction.user.tag);
                if (added) {
                    return interaction.editReply(`✅ Added \`${keyword.toLowerCase()}\` to the scraper blacklist.`);
                } else {
                    return interaction.editReply(`⚠️ \`${keyword.toLowerCase()}\` is already blacklisted.`);
                }
            } catch (err) {
                console.error('[tgblacklist] add error:', err);
                return interaction.editReply('❌ Failed to add keyword to the blacklist.');
            }
        }

        if (subcommand === 'remove') {
            const keyword = interaction.options.getString('keyword').trim();
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const removed = await removeKeywordFromBlacklist(keyword);
                if (removed) {
                    return interaction.editReply(`🗑️ Removed \`${keyword.toLowerCase()}\` from the scraper blacklist.`);
                } else {
                    return interaction.editReply(`⚠️ \`${keyword.toLowerCase()}\` is not in the blacklist.`);
                }
            } catch (err) {
                console.error('[tgblacklist] remove error:', err);
                return interaction.editReply('❌ Failed to remove keyword.');
            }
        }

        if (subcommand === 'clear') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            try {
                const count = await clearKeywordBlacklist();
                return interaction.editReply(`🗑️ Wiped the blacklist. Removed ${count} keyword(s).`);
            } catch (err) {
                console.error('[tgblacklist] clear error:', err);
                return interaction.editReply('❌ Failed to clear the blacklist.');
            }
        }
    }
};

```

# src\commands\verify.js

```js
const {SlashCommandBuilder} = require("@discordjs/builders");
const {showEmailModal} = require("../bot/showEmailModal");
module.exports = {
    data: new SlashCommandBuilder().setDefaultPermission(true).setName('verify').setDescription('Start the email verification process to get access to this server'),
    async execute(interaction) {
        const {userGuilds} = require("../EmailBot");
        await showEmailModal(interaction, interaction.guild, userGuilds)
    }
}

```

# src\crypto\Crypto.js

```js
const crypto = require("crypto")


module.exports = function md5hash(value) {
    return crypto.createHash("md5").update(value).digest("base64")
}
```

# src\database\Database.js

```js
const ServerSettings = require('./ServerSettings.js')
const EmailUser = require("./EmailUser");
const sqlite3 = require('sqlite3').verbose()
const md5hash = require("../crypto/Crypto")
const path = require('path')
const fs = require('fs')

let config = {};
try { config = require('../../config/config.json'); } catch {}

const legacyDbPath = path.join(__dirname, '../../config/bot.db');

// Use an explicit persistent path from config if set (recommended for hosted environments
// where the app directory may be recreated on deploy). Falls back to config/bot.db.
const botDbPath = config.botDbPath
    ? path.join(path.resolve(config.botDbPath), 'bot.db')
    : legacyDbPath;

// Ensure the directory exists
const botDbDir = path.dirname(botDbPath);
if (!fs.existsSync(botDbDir)) {
    fs.mkdirSync(botDbDir, { recursive: true });
}

// Auto-copy existing legacy database to persistent path on first run
if (botDbPath !== legacyDbPath && !fs.existsSync(botDbPath) && fs.existsSync(legacyDbPath)) {
    console.log(`[Database] Copying existing bot.db from legacy path to persistent location...`);
    fs.copyFileSync(legacyDbPath, botDbPath);
}

console.log(`[Database] Using database at: ${botDbPath}`);

class Database {
    constructor() {
        this.db = new sqlite3.Database(botDbPath);


        this.runMigration(1, () => {
            this.db.run("CREATE TABLE IF NOT EXISTS guilds(guildid INT PRIMARY KEY,domains TEXT, verifiedrole TEXT,unverifiedrole Text, channelid TEXT, messageid TEXT, language TEXT);")
            this.db.run("CREATE TABLE IF NOT EXISTS userEmails(email TEXT,userID TEXT, guildID TEXT, groupID TEXT,isPublic INTEGER, PRIMARY KEY (email, guildID));")
        })
        this.runMigration(2, () => {
            this.db.each("SELECT email, guildID FROM userEmails", (err, result) => {
                this.db.run("UPDATE userEmails SET email = ? WHERE email = ? AND guildID = ?;", [md5hash(result.email), result.email, result.guildID])
            })
        })
        this.runMigration(3, () => {
            this.db.run("ALTER TABLE guilds ADD autoVerify NUMBER DEFAULT 0")
            this.db.run("ALTER TABLE guilds ADD autoAddUnverified NUMBER DEFAULT 0")
        })
        this.runMigration(4, () => {
            this.db.run("ALTER TABLE guilds ADD verifyMessage TEXT DEFAULT ''")
        })
        this.runMigration(5, () => {
            this.db.run("ALTER TABLE guilds ADD logChannel TEXT DEFAULT ''")
        })
        this.runMigration(6, () => {
            this.db.run("ALTER TABLE guilds ADD blacklist TEXT DEFAULT ''")
            })
        this.runMigration(7, () => {
            this.db.run("ALTER TABLE guilds ADD errorNotifyType TEXT DEFAULT 'owner'")
            this.db.run("ALTER TABLE guilds ADD errorNotifyTarget TEXT DEFAULT ''")
        })
        this.runMigration(8, () => {
            this.db.run(`CREATE TABLE IF NOT EXISTS guild_stats(
                guildID TEXT PRIMARY KEY,
                mailsSentTotal INTEGER DEFAULT 0,
                mailsSentMonth INTEGER DEFAULT 0,
                verificationsTotal INTEGER DEFAULT 0,
                verificationsMonth INTEGER DEFAULT 0,
                statsMonth TEXT DEFAULT ''
            );`)
        })
        this.runMigration(9, () => {
            // Rename language from 'france' to 'french'
            this.db.run("UPDATE guilds SET language = 'french' WHERE language = 'france';")
        })
        this.runMigration(10, () => {
            // Add domain-based roles support
            // defaultRoles: JSON array of role IDs always assigned on verification
            // domainRoles: JSON object mapping domain patterns to arrays of role IDs
            this.db.run("ALTER TABLE guilds ADD defaultRoles TEXT DEFAULT '[]'")
            this.db.run("ALTER TABLE guilds ADD domainRoles TEXT DEFAULT '{}'")
            // Migrate existing verifiedrole to defaultRoles
            this.db.each("SELECT guildid, verifiedrole FROM guilds WHERE verifiedrole IS NOT NULL AND verifiedrole != ''", (err, result) => {
                if (!err && result && result.verifiedrole) {
                    const defaultRoles = JSON.stringify([result.verifiedrole])
                    this.db.run("UPDATE guilds SET defaultRoles = ? WHERE guildid = ?", [defaultRoles, result.guildid])
                }
            })
        })
        this.runMigration(11, () => {
            // Migrate domains and blacklist from comma-separated strings to JSON arrays
            this.db.each("SELECT guildid, domains, blacklist FROM guilds", (err, result) => {
                if (!err && result) {
                    // Convert domains from comma-separated to JSON
                    let domainsJson = '[]'
                    if (result.domains && result.domains.length > 0) {
                        try {
                            // Check if already JSON
                            JSON.parse(result.domains)
                            domainsJson = result.domains
                        } catch {
                            // Convert comma-separated to JSON array
                            const domainsArray = result.domains.split(',').filter(d => d.length > 0)
                            domainsJson = JSON.stringify(domainsArray)
                        }
                    }
                    
                    // Convert blacklist from comma-separated to JSON
                    let blacklistJson = '[]'
                    if (result.blacklist && result.blacklist.length > 0) {
                        try {
                            // Check if already JSON
                            JSON.parse(result.blacklist)
                            blacklistJson = result.blacklist
                        } catch {
                            // Convert comma-separated to JSON array
                            const blacklistArray = result.blacklist.split(',').filter(b => b.length > 0)
                            blacklistJson = JSON.stringify(blacklistArray)
                        }
                    }
                    
                    this.db.run("UPDATE guilds SET domains = ?, blacklist = ? WHERE guildid = ?", 
                        [domainsJson, blacklistJson, result.guildid])
                }
            })
        })
    }

    runMigration(version, migration) {
        this.db.get("PRAGMA user_version;", (err, result) => {
            if (err) {
                throw err
            }
            if (result.user_version < version) {
                console.log("Run Migration: " + version)
                this.db.serialize(() => {
                    migration()
                })
                console.log("Finished: " + version)
                this.db.run(`PRAGMA user_version = ${version}`)
            }
        })
    }

    deleteUserData(userID) {
        this.db.run("DELETE FROM userEmails WHERE userID = ?;", [userID])
    }

    deleteServerData(guildID) {
        this.db.run("DELETE FROM guilds WHERE guildid = ?;", [guildID])
        this.db.run("DELETE FROM userEmails WHERE guildID = ?;", [guildID])
    }


    updateServerSettings(guildID, serverSettings) {
        this.db.run(
            "INSERT OR REPLACE INTO guilds (guildid, domains, blacklist, verifiedrole, unverifiedrole, channelid, messageid, language, autoVerify, autoAddUnverified, verifyMessage, logChannel, errorNotifyType, errorNotifyTarget, defaultRoles, domainRoles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [guildID, JSON.stringify(serverSettings.domains), JSON.stringify(serverSettings.blacklist), serverSettings.verifiedRoleName, serverSettings.unverifiedRoleName, serverSettings.channelID, serverSettings.messageID, serverSettings.language, serverSettings.autoVerify, serverSettings.autoAddUnverified, serverSettings.verifyMessage, serverSettings.logChannel, serverSettings.errorNotifyType, serverSettings.errorNotifyTarget, JSON.stringify(serverSettings.defaultRoles), JSON.stringify(serverSettings.domainRoles)])
    }

    async getServerSettings(guildID, callback) {
        const serverSettings = new ServerSettings()
        await this.db.get("SELECT * FROM guilds WHERE guildid = ?", [guildID], async (err, result) => {
                if (err) {
                    throw err;
                }
                if (result !== undefined) {
                    serverSettings.channelID = result.channelid
                    serverSettings.messageID = result.messageid
                    serverSettings.verifiedRoleName = result.verifiedrole
                    serverSettings.unverifiedRoleName = result.unverifiedrole
                    serverSettings.language = result.language
                    serverSettings.autoVerify = result.autoVerify
                    serverSettings.autoAddUnverified = result.autoAddUnverified
                    serverSettings.verifyMessage = result.verifyMessage
                    serverSettings.logChannel = result.logChannel
                    serverSettings.errorNotifyType = result.errorNotifyType || "owner"
                    serverSettings.errorNotifyTarget = result.errorNotifyTarget || ""
                    
                    // Parse domains (JSON array, with fallback for legacy comma-separated format)
                    try {
                        serverSettings.domains = result.domains ? JSON.parse(result.domains) : []
                    } catch {
                        // Fallback to comma-separated format for backward compatibility
                        serverSettings.domains = result.domains ? result.domains.split(",").filter(d => d.length !== 0) : []
                    }
                    
                    // Parse blacklist (JSON array, with fallback for legacy comma-separated format)
                    try {
                        serverSettings.blacklist = result.blacklist ? JSON.parse(result.blacklist) : []
                    } catch {
                        // Fallback to comma-separated format for backward compatibility
                        serverSettings.blacklist = result.blacklist ? result.blacklist.split(",").filter(b => b.length !== 0) : []
                    }
                    
                    // Parse defaultRoles (JSON array)
                    try {
                        serverSettings.defaultRoles = result.defaultRoles ? JSON.parse(result.defaultRoles) : []
                    } catch {
                        serverSettings.defaultRoles = []
                    }
                    
                    // Parse domainRoles (JSON object)
                    try {
                        serverSettings.domainRoles = result.domainRoles ? JSON.parse(result.domainRoles) : {}
                    } catch {
                        serverSettings.domainRoles = {}
                    }
                    
                    // Legacy migration: if defaultRoles is empty but verifiedRoleName exists, use it
                    if (serverSettings.defaultRoles.length === 0 && serverSettings.verifiedRoleName) {
                        serverSettings.defaultRoles = [serverSettings.verifiedRoleName]
                    }
                }
                callback(serverSettings)
            }
        )
    }

    updateEmailUser(emailUser) {
        this.db.run(
            "INSERT OR REPLACE INTO userEmails (email, userID, guildID, groupID, isPublic) VALUES (?, ?, ?, ?, ?)",
            [emailUser.email, emailUser.userID, emailUser.guildID, emailUser.groupID, emailUser.isPublic])
    }

    getEmailUser(email, guildID, callback) {
        this.db.get("SELECT * FROM userEmails WHERE guildID = ? AND email = ?", [guildID, email], (err, result) => {
                if (err) {
                    throw err;
                }
                if (result !== undefined) {
                    callback(new EmailUser(result.email, result.userID, result.guildID, result.groupID, result.isPublic))
                }
            }
        )
    }

    getCurrentMonth() {
        const now = new Date()
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    }

    getGuildStats(guildID, callback) {
        const currentMonth = this.getCurrentMonth()
        this.db.get("SELECT * FROM guild_stats WHERE guildID = ?", [guildID], (err, result) => {
            if (err) {
                console.error('Error getting guild stats:', err)
                callback({ mailsSentTotal: 0, mailsSentMonth: 0, verificationsTotal: 0, verificationsMonth: 0 })
                return
            }
            if (result === undefined) {
                callback({ mailsSentTotal: 0, mailsSentMonth: 0, verificationsTotal: 0, verificationsMonth: 0 })
                return
            }
            // Reset monthly counters if month changed
            if (result.statsMonth !== currentMonth) {
                callback({
                    mailsSentTotal: result.mailsSentTotal,
                    mailsSentMonth: 0,
                    verificationsTotal: result.verificationsTotal,
                    verificationsMonth: 0
                })
            } else {
                callback({
                    mailsSentTotal: result.mailsSentTotal,
                    mailsSentMonth: result.mailsSentMonth,
                    verificationsTotal: result.verificationsTotal,
                    verificationsMonth: result.verificationsMonth
                })
            }
        })
    }

    incrementMailsSent(guildID) {
        const currentMonth = this.getCurrentMonth()
        this.db.get("SELECT * FROM guild_stats WHERE guildID = ?", [guildID], (err, result) => {
            if (err) {
                console.error('Error incrementing mails sent:', err)
                return
            }
            if (result === undefined) {
                // Create new entry
                this.db.run(
                    "INSERT INTO guild_stats (guildID, mailsSentTotal, mailsSentMonth, verificationsTotal, verificationsMonth, statsMonth) VALUES (?, 1, 1, 0, 0, ?)",
                    [guildID, currentMonth]
                )
            } else if (result.statsMonth !== currentMonth) {
                // Reset monthly counter for new month
                this.db.run(
                    "UPDATE guild_stats SET mailsSentTotal = mailsSentTotal + 1, mailsSentMonth = 1, verificationsMonth = 0, statsMonth = ? WHERE guildID = ?",
                    [currentMonth, guildID]
                )
            } else {
                // Increment both counters
                this.db.run(
                    "UPDATE guild_stats SET mailsSentTotal = mailsSentTotal + 1, mailsSentMonth = mailsSentMonth + 1 WHERE guildID = ?",
                    [guildID]
                )
            }
        })
    }

    incrementVerifications(guildID) {
        const currentMonth = this.getCurrentMonth()
        this.db.get("SELECT * FROM guild_stats WHERE guildID = ?", [guildID], (err, result) => {
            if (err) {
                console.error('Error incrementing verifications:', err)
                return
            }
            if (result === undefined) {
                // Create new entry
                this.db.run(
                    "INSERT INTO guild_stats (guildID, mailsSentTotal, mailsSentMonth, verificationsTotal, verificationsMonth, statsMonth) VALUES (?, 0, 0, 1, 1, ?)",
                    [guildID, currentMonth]
                )
            } else if (result.statsMonth !== currentMonth) {
                // Reset monthly counter for new month
                this.db.run(
                    "UPDATE guild_stats SET verificationsTotal = verificationsTotal + 1, verificationsMonth = 1, mailsSentMonth = 0, statsMonth = ? WHERE guildID = ?",
                    [currentMonth, guildID]
                )
            } else {
                // Increment both counters
                this.db.run(
                    "UPDATE guild_stats SET verificationsTotal = verificationsTotal + 1, verificationsMonth = verificationsMonth + 1 WHERE guildID = ?",
                    [guildID]
                )
            }
        })
    }

    getAllGuildStats() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM guild_stats", [], (err, rows) => {
                if (err) {
                    console.error('Error getting all guild stats:', err)
                    reject(err)
                    return
                }
                resolve(rows || [])
            })
        })
    }
}

const database = new Database()

module.exports = database



```

# src\database\EmailUser.js

```js
class EmailUser {
    constructor(email, userID, guildID, groupID, isPublic) {
        this.email = email
        this.userID = userID
        this.guildID = guildID
        this.groupID = groupID
        this.isPublic = isPublic
    }
}

module.exports = EmailUser
```

# src\database\ServerSettings.js

```js
class ServerSettings {
    constructor() {
        this.domains = []
        this.blacklist = []
        this.channelID = ""
        this.messageID = ""
        this.verifiedRoleName = ""
        this.unverifiedRoleName = ""
        this.autoAddUnverified = 0
        this.autoVerify = 0
        this.language = "english"
        this.verifyMessage = ""
        this.logChannel = ""
        // Error notification settings: 'owner' (default), 'user', or 'channel'
        this.errorNotifyType = "owner"
        // The user ID or channel ID for error notifications (empty means use owner)
        this.errorNotifyTarget = ""
        // Default roles assigned to all verified users (array of role IDs)
        this.defaultRoles = []
        // Domain-specific roles: { "@domain.com": ["roleId1", "roleId2"], "@*.edu": ["roleId3"] }
        this.domainRoles = {}
    }

    get status() {
        // Bot is configured if domains exist AND at least one role is configured (default or domain-specific)
        const hasRoles = this.defaultRoles.length > 0 || 
                         Object.keys(this.domainRoles).length > 0 || 
                         this.verifiedRoleName !== "" // Legacy support
        return this.domains.length !== 0 && hasRoles
    }
}

module.exports = ServerSettings
```

# src\discord\CommandHandler.js

```js
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.json');

// Dynamically load every command file from src/commands/
// Adding a new command = drop a file in that folder, nothing else needed here
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

const commands = commandFiles.map(file => require(path.join(commandsPath, file)));

// Build a lookup map for fast routing in the interaction handler
const commandMap = new Map(commands.map(cmd => [cmd.definition.name, cmd]));

console.log(`[CommandHandler] Loaded ${commands.length} commands: ${[...commandMap.keys()].join(', ')}`);

// Registers all slash commands with Discord as guild commands.
// Guild commands update instantly (vs global commands which take up to 1 hour).
async function registerCommands() {
    if (!config.clientId || !config.guildId) {
        return console.warn('[CommandHandler] clientId or guildId missing from config — skipping slash command registration.');
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        console.log('[CommandHandler] Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commands.map(cmd => cmd.definition) }
        );

        console.log(`[CommandHandler] Successfully registered ${commands.length} slash commands.`);
    } catch (err) {
        console.error('[CommandHandler] Failed to register slash commands:', err.message);
    }
}

// Attaches the interactionCreate listener to the Discord client.
// Call this once during bot startup, before the client logs in.
function attachInteractionHandler(discordClient) {
    discordClient.on('interactionCreate', async (interaction) => {
        if (interaction.isButton()) {
            return;
        }

        if (!interaction.isChatInputCommand()) return;

        const command = commandMap.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`[CommandHandler] Error executing /${interaction.commandName}:`, err.message);

            const errorMsg = '❌ An unexpected error occurred while running this command.';
            if (interaction.deferred || interaction.replied) {
                interaction.editReply(errorMsg).catch(() => {});
            } else {
                interaction.reply({ content: errorMsg, ephemeral: true }).catch(() => {});
            }
        }
    });

    console.log('[CommandHandler] Interaction handler attached.');
}

module.exports = { registerCommands, attachInteractionHandler };

```

# src\EmailBot.js

```js
require('dotenv').config();
const Discord = require('discord.js');
const {token, clientId} = require('../config/config.json');
const database = require('./database/Database.js')
const {stdin, stdout} = require('process')
const readline = require('readline')
let rl = null
const fs = require("fs");
const {getLocale, defaultLanguage} = require('./Language')
require("./database/ServerSettings");
const ServerStatsAPI = require("./api/ServerStatsAPI");
const topggAPI = require("./api/TopGG")
const MailSender = require("./mail/MailSender")
const sendVerifyMessage = require("./bot/sendVerifyMessage")
const {showEmailModal} = require("./bot/showEmailModal")
const rest = require("./api/DiscordRest")
const registerRemoveDomain = require("./bot/registerRemoveDomain")
const registerBlacklistChoices = require("./bot/registerBlacklistChoices")
const {PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, LabelBuilder, TextDisplayBuilder, EmbedBuilder} = require("discord.js");
const UserTimeout = require("./UserTimeout");
const md5hash = require("./crypto/Crypto");
const EmailUser = require("./database/EmailUser");
const { MessageFlags } = require('discord.js');
const { createSessionExpiredEmbed, createInvalidCodeEmbed, createInvalidEmailEmbed, createVerificationSuccessEmbed, createCodeSentEmbed } = require('./utils/embeds');
const ErrorNotifier = require('./utils/ErrorNotifier');
const { emailMatchesDomains, emailIsBlacklisted, getMatchingDomainPatterns } = require('./utils/wildcardMatch');
const { start: startTelegram } = require('./telegram/TelegramListener');

const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers
    ],
    partials: [Discord.Partials.Channel]
});

const serverStatsAPI = new ServerStatsAPI(bot, false)
bot.serverStatsAPI = serverStatsAPI

let emailNotify = true

module.exports.userGuilds = userGuilds = new Map()

const userCodes = new Map()

let userTimeouts = new Map()

const mailSender = new MailSender(serverStatsAPI)

bot.userGuilds = userGuilds
bot.userCodes = userCodes
bot.userTimeouts = userTimeouts
bot.serverStatsAPI = serverStatsAPI

const verifyPromptMessages = new Map()
const codePromptMessages = new Map()

module.exports.verifyPromptMessages = verifyPromptMessages
module.exports.codePromptMessages = codePromptMessages

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    const cmdData = command.data ?? command.definition;
    if (!cmdData) { console.warn(`Skipping ${file}: no data or definition`); continue; }
    bot.commands.set(cmdData.name, command);
    commands.push(typeof cmdData.toJSON === 'function' ? cmdData.toJSON() : cmdData)
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function registerCommands(guild, count = 0, total = 0, attempt = 1) {
    try {
        await rest.put(
            Discord.Routes.applicationGuildCommands(clientId, guild.id),
            { body: commands }
        );
        console.log(`[Shard ${bot.shard?.ids ?? 'N/A'}] Successfully registered application commands for ${guild.name}: ${count}/${total}`);
    } catch (err) {
        const code = err?.code || err?.cause?.code;
        const status = err?.status ?? err?.statusCode;
        const discordCode = err?.rawError?.code;

        console.error(`[Shard ${bot.shard?.ids ?? 'N/A'}] Failed to register commands for ${guild.name} (attempt ${attempt}/${MAX_RETRIES}) – code=${code}, status=${status}, discordCode=${discordCode}`);

        const isTimeout = code === 'UND_ERR_CONNECT_TIMEOUT' || err?.message?.includes('Connect Timeout Error');

        if (isTimeout && attempt < MAX_RETRIES) {
            console.log(`Timeout while registering commands for ${guild.name}, retrying in ${RETRY_DELAY_MS}ms...`);
            await sleep(RETRY_DELAY_MS);
            return registerCommands(guild, count, total, attempt + 1);
        }

        const missingPerms = status === 403 || discordCode === 50013;

        if (missingPerms) {
            await ErrorNotifier.notify({
                guild: guild,
                errorTitle: 'Missing Permissions',
                errorMessage: 'The bot does not have permission to create slash commands. The bot will leave the server.\n\nTo fix this, please re-invite the bot with proper permissions: https://emailbot.larskaesberg.de/',
                language: 'english'
            });
            try {
                await bot.guilds.cache.get(guild.id)?.leave();
                console.log(`Left guild ${guild.name} due to missing permissions.`);
            } catch (e) {
                console.error(`Failed to leave guild ${guild.name}:`, e);
            }
            return;
        }

        console.warn(`Non-fatal error while registering commands for ${guild.name}. Not leaving guild; continuing.`);
    }
}

async function registerAllGuilds(bot) {
    const guilds = Array.from(bot.guilds.cache.values());
    const total = guilds.length;
    const concurrency = 5;
    let index = 0;

    async function worker() {
        while (true) {
            const i = index++;
            if (i >= total) break;
            const guild = guilds[i];
            const count = i + 1;
            await registerCommands(guild, count, total);
            registerRemoveDomain(guild.id);
            registerBlacklistChoices(guild.id);
            database.getServerSettings(guild.id, async serverSettings => {
                try {
                    await bot.guilds.cache.get(guild.id)?.channels.cache.get(serverSettings.channelID)?.messages.fetch(serverSettings.messageID);
                } catch (e) {}
            });
        }
    }

    await Promise.all(Array.from({ length: concurrency }, () => worker()));
    console.log(`[Shard ${bot.shard?.ids ?? 'N/A'}] Finished registering commands for all guilds`);
}

bot.once('clientReady', async () => {
    const isPrimary = !bot.shard || bot.shard.ids.includes(0)
    if (isPrimary) {
        serverStatsAPI.app.listen(serverStatsAPI.port, () => {
            console.log(`App listening on port ${serverStatsAPI.port}!`)
        })
	startTelegram(bot);
        rl = readline.createInterface(stdin, stdout)
        rl.on("line", async command => {
            switch (command) {
                case "help":
                    console.log("Commands: email,servers")
                    break
                case "email":
                    emailNotify = !emailNotify
                    console.log("Email Notification: " + emailNotify.toString())
                    break
                case "servers":
                    console.log("------------------------------")
                    console.log("Servers:");
                    const servers = (await bot.guilds.fetch())
                    servers.forEach(guild => { console.log(guild.name) })
                    console.log("Server: " + servers.size)
                    console.log("------------------------------")
                    break
                default:
                    console.log("No command found!")
                    break
            }
        })
    }
    if (!bot.shard) {
        try {
            topggAPI(bot);
        } catch (e) {
            console.error('Failed to start TopGG API:', e);
        }
    }
    await registerAllGuilds(bot);
    bot.user.setActivity("/verify | Website", { type: "PLAYING", url: "https://emailbot.larskaesberg.de" });
});

setInterval(function () {
    bot.user.setActivity("/verify | Website", { type: "PLAYING", url: "https://emailbot.larskaesberg.de" })
}, 3600000);

bot.on("guildDelete", guild => {
    console.log("Removed: " + guild.name)
    database.deleteServerData(guild.id)
})

bot.on("guildMemberAdd", async member => {
    await database.getServerSettings(member.guild.id, async serverSettings => {
        if (serverSettings.autoAddUnverified) {
            const roleUnverified = member.guild.roles.cache.find(role => role.id === serverSettings.unverifiedRoleName);
            if (roleUnverified !== undefined) {
                try {
                    await member.roles.add(roleUnverified)
                } catch (e) {
                    await ErrorNotifier.notify({
                        guild: member.guild,
                        errorTitle: getLocale(serverSettings.language, 'errorRoleAssignTitle'),
                        errorMessage: getLocale(serverSettings.language, 'errorRoleAssignMessage'),
                        user: member.user,
                        language: serverSettings.language
                    })
                }
            }
        }
        if (serverSettings.autoVerify) {
            await sendVerifyMessage(member.guild, member.user, userGuilds)
        }
    })
})

bot.on('guildCreate', guild => {
    console.log(`[Shard ${bot.shard?.ids ?? 'N/A'}] New guild: ${guild.name}`)
    registerCommands(guild)
})

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return
    if (message.content === "") return
    console.log(`[Shard ${bot.shard?.ids ?? 'N/A'}] Message created: "${message.content}" in ${message.guild?.name ?? 'DM'} by ${message.author.username} (${message.author.id})`)
})

bot.on('messageReactionAdd', async (reaction, user) => {
    try {
        if (user.bot) return
        if (reaction.partial) { try { await reaction.fetch() } catch {} }
        const message = reaction.message
        const guild = message.guild
        if (!guild) return
        await database.getServerSettings(guild.id, async serverSettings => {
            if (message.channel.id === serverSettings.channelID && message.id === serverSettings.messageID) {
                try {
                    await message.channel.send(`<@${user.id}> Reaction-based verification is deprecated. Please contact a server admin and ask them to create a new verification flow with the /button command. Once the button message is available, click it to begin verification.`)
                } catch {}
            }
        })
    } catch {}
});

bot.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        if (interaction.customId === 'verifyButton' || interaction.customId === 'openEmailModal') {
            const guild = interaction.guild || userGuilds.get(interaction.user.id)
            await showEmailModal(interaction, guild, userGuilds)
            return
        }
        if (interaction.customId === 'openCodeModal') {
            const userGuild = interaction.guild || userGuilds.get(interaction.user.id)
            if (!userGuild) {
                await interaction.reply({ embeds: [createSessionExpiredEmbed(true)], flags: MessageFlags.Ephemeral }).catch(() => {})
                return
            }
            const key = interaction.user.id + userGuild.id
            const userCode = userCodes.get(key)
            await database.getServerSettings(userGuild.id, async serverSettings => {
                const language = serverSettings.language
                let headerText = getLocale(language, 'codeModalHeader')
                if (userCode && userCode.logEmail) {
                    headerText += `\n\n📬 **Sent to:** ${userCode.logEmail}`
                }
                headerText += '\n\n-# Check your spam folder if you don\'t see the email'
                const modal = new ModalBuilder().setCustomId('codeModal').setTitle(getLocale(language, 'codeModalTitle'))
                const codeInput = new TextInputBuilder().setCustomId('codeInput').setStyle(TextInputStyle.Short).setPlaceholder(getLocale(language, 'codeModalPlaceholder')).setMinLength(6).setMaxLength(6).setRequired(true)
                const codeLabel = new LabelBuilder().setLabel(getLocale(language, 'codeModalLabel')).setTextInputComponent(codeInput)
                const headerDisplay = new TextDisplayBuilder().setContent(headerText)
                modal.addTextDisplayComponents(headerDisplay).addLabelComponents(codeLabel)
                await interaction.showModal(modal).catch(() => {})
                setTimeout(() => {
                    try {
                        if (interaction.message && interaction.message.id && interaction.message.flags?.has(MessageFlags.Ephemeral)) {
                            interaction.message.delete().catch(() => {})
                            interaction.webhook.deleteMessage(interaction.message.id).catch(() => {})
                        }
                    } catch {}
                }, 0)
            })
            return
        }
        return
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'emailModal') {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral }).catch(() => {})
            const emailText = interaction.fields.getTextInputValue('emailInput').trim()
            const userGuild = userGuilds.get(interaction.user.id)
            if (!userGuild) {
                await interaction.followUp({ embeds: [createSessionExpiredEmbed(false)], flags: MessageFlags.Ephemeral }).catch(() => {})
                return
            }
            await database.getServerSettings(userGuild.id, async serverSettings => {
                if (!serverSettings.status) {
                    await ErrorNotifier.notify({ guild: userGuild, errorTitle: getLocale(serverSettings.language, 'errorBotNotConfiguredTitle'), errorMessage: getLocale(serverSettings.language, 'errorBotNotConfiguredMessage'), user: interaction.user, interaction: interaction, language: serverSettings.language });
                    return
                }
                if (emailIsBlacklisted(emailText, serverSettings.blacklist)) {
                    const blacklistEmbed = new EmbedBuilder().setTitle(getLocale(serverSettings.language, "mailBlacklistedTitle")).setDescription(getLocale(serverSettings.language, "mailBlacklistedDescription")).setColor(0xED4245)
                    await interaction.followUp({ embeds: [blacklistEmbed], flags: MessageFlags.Ephemeral }).catch(() => {})
                    return
                }
                const hasValidFormat = emailText.split("@").length - 1 === 1 && !emailText.includes(' ')
                const matchesDomain = emailMatchesDomains(emailText, serverSettings.domains)
                if (!hasValidFormat || !matchesDomain) {
                    await interaction.followUp({ embeds: [createInvalidEmailEmbed(serverSettings.language)], flags: MessageFlags.Ephemeral }).catch(() => {})
                    return
                }
                let userTimeout = userTimeouts.get(interaction.user.id)
                if (!userTimeout) { userTimeout = new UserTimeout(); userTimeouts.set(interaction.user.id, userTimeout) }
                const timeoutMs = userTimeout.timestamp + userTimeout.waitseconds * 1000 - Date.now()
                if (timeoutMs > 0) {
                    const timeoutEmbed = new EmbedBuilder().setTitle(getLocale(serverSettings.language, "mailTimeoutTitle")).setDescription(getLocale(serverSettings.language, "mailTimeoutDescription", (timeoutMs / 1000).toFixed(0))).setColor(0xFFA500)
                    await interaction.followUp({ embeds: [timeoutEmbed], flags: MessageFlags.Ephemeral }).catch(() => {})
                    return
                }
                userTimeout.timestamp = Date.now()
                userTimeout.increaseWaitTime()
                const code = Math.floor((Math.random() + 1) * 100000).toString()
                await mailSender.sendEmail(emailText.toLowerCase(), code, userGuild.name, interaction, emailNotify, async (email) => {
                    userCodes.set(interaction.user.id + userGuild.id, { code: code, email: md5hash(email), logEmail: email })
                    const codePromptEmbed = createCodeSentEmbed(serverSettings.language, emailText.toLowerCase())
                    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('openCodeModal').setLabel(getLocale(serverSettings.language, 'enterCodeButton')).setEmoji('🔑').setStyle(ButtonStyle.Success))
                    const prevVerifyPromptId = verifyPromptMessages.get(interaction.user.id)
                    if (prevVerifyPromptId) { verifyPromptMessages.delete(interaction.user.id); interaction.webhook.deleteMessage(prevVerifyPromptId).catch(() => {}) }
                    await interaction.followUp({ embeds: [codePromptEmbed], components: [row], flags: MessageFlags.Ephemeral }).catch(() => null)
                    const follow = await interaction.fetchReply().catch(() => null)
                    if (follow && follow.id) {
                        codePromptMessages.set(interaction.user.id + userGuild.id, follow.id)
                        setTimeout(() => { interaction.webhook.deleteMessage(follow.id).catch(() => {}) }, 300000)
                    }
                })
            })
            return
        }
        if (interaction.customId === 'codeModal') {
            const codeText = interaction.fields.getTextInputValue('codeInput').trim()
            const userGuild = userGuilds.get(interaction.user.id)
            if (!userGuild) {
                await interaction.reply({ embeds: [createSessionExpiredEmbed(true)], flags: MessageFlags.Ephemeral }).catch(() => null)
                const sent = await interaction.fetchReply().catch(() => null)
                setTimeout(() => { try { interaction.deleteReply().catch(() => {}) } catch {} try { if (sent && sent.id) interaction.webhook.deleteMessage(sent.id).catch(() => {}) } catch {} }, 10000)
                return
            }
            await database.getServerSettings(userGuild.id, async serverSettings => {
                if (!serverSettings.status) {
                    await ErrorNotifier.notify({ guild: userGuild, errorTitle: getLocale(serverSettings.language, 'errorBotNotConfiguredTitle'), errorMessage: getLocale(serverSettings.language, 'errorBotNotConfiguredMessage'), user: interaction.user, interaction: interaction, language: serverSettings.language });
                    return
                }
                const userCode = userCodes.get(interaction.user.id + userGuild.id)
                if (userCode && userCode.code === codeText) {
                    const defaultRoles = serverSettings.defaultRoles || []
                    const domainRoles = serverSettings.domainRoles || {}
                    const matchingPatterns = getMatchingDomainPatterns(userCode.logEmail, Object.keys(domainRoles))
                    const domainRoleIds = []
                    for (const pattern of matchingPatterns) { if (domainRoles[pattern]) { domainRoleIds.push(...domainRoles[pattern]) } }
                    const allRoleIds = [...new Set([...defaultRoles, ...domainRoleIds])]
                    const rolesToAdd = allRoleIds.map(id => userGuild.roles.cache.get(id)).filter(role => role !== undefined)
                    const roleUnverified = userGuild.roles.cache.find(role => role.id === serverSettings.unverifiedRoleName);
                    database.getEmailUser(userCode.email, userGuild.id, async (currentUserEmail) => {
                        let member = await userGuild.members.fetch(currentUserEmail.userID).catch(() => null)
                        if (interaction.user.id === currentUserEmail.userID) {
                        } else if (member) {
                            try { for (const role of rolesToAdd) { await member.roles.remove(role).catch(() => {}) } if (roleUnverified) { await member.roles.add(roleUnverified) } } catch (e) { console.log(e) }
                            try { await member.send("You got unverified on " + userGuild.name + " because somebody else used that email!").catch(() => {}) } catch {}
                        }
                    })
                    const primaryRoleId = defaultRoles.length > 0 ? defaultRoles[0] : (allRoleIds[0] || '')
                    database.updateEmailUser(new EmailUser(userCode.email, interaction.user.id, userGuild.id, primaryRoleId, 0))
                    const assignedRoleNames = []
                    try {
                        const verifyMember = await userGuild.members.fetch(interaction.user.id)
                        for (const role of rolesToAdd) { await verifyMember.roles.add(role); assignedRoleNames.push(role.name) }
                        if (serverSettings.unverifiedRoleName !== "") { await verifyMember.roles.remove(roleUnverified).catch(() => {}) }
                    } catch (e) {
                        await ErrorNotifier.notify({ guild: userGuild, errorTitle: getLocale(serverSettings.language, 'errorRoleAssignTitle'), errorMessage: getLocale(serverSettings.language, 'errorRoleAssignMessage'), user: interaction.user, interaction: interaction, language: serverSettings.language })
                        return
                    }
                    try { if (serverSettings.logChannel !== "") { const rolesText = assignedRoleNames.length > 0 ? ` [${assignedRoleNames.join(', ')}]` : ''; userGuild.channels.cache.get(serverSettings.logChannel).send(`✅ <@${interaction.user.id}> → \`${userCode.logEmail}\`${rolesText}`).catch(() => {}) } } catch {}
                    const successEmbed = createVerificationSuccessEmbed(serverSettings.language, assignedRoleNames, userGuild.name, userGuild.iconURL({ dynamic: true }))
                    await interaction.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral }).catch(() => null)
                    const sent = await interaction.fetchReply().catch(() => null)
                    serverStatsAPI.increaseVerifiedUsers()
                    database.incrementVerifications(userGuild.id)
                    const codePromptId = codePromptMessages.get(interaction.user.id + userGuild.id)
                    if (codePromptId) { codePromptMessages.delete(interaction.user.id + userGuild.id); interaction.webhook.deleteMessage(codePromptId).catch(() => {}) }
                    setTimeout(() => { try { interaction.deleteReply().catch(() => {}) } catch {} try { if (sent && sent.id) interaction.webhook.deleteMessage(sent.id).catch(() => {}) } catch {} }, 20000)
                    userCodes.delete(interaction.user.id + userGuild.id)
                } else {
                    await interaction.reply({ embeds: [createInvalidCodeEmbed(serverSettings.language)], flags: MessageFlags.Ephemeral }).catch(() => null)
                    const sent = await interaction.fetchReply().catch(() => null)
                    const codePromptId = codePromptMessages.get(interaction.user.id + userGuild.id)
                    if (codePromptId) { codePromptMessages.delete(interaction.user.id + userGuild.id); interaction.webhook.deleteMessage(codePromptId).catch(() => {}) }
                    setTimeout(() => { try { interaction.deleteReply().catch(() => {}) } catch {} try { if (sent && sent.id) interaction.webhook.deleteMessage(sent.id).catch(() => {}) } catch {} }, 10000)
                }
            })
            return
        }
        return
    }

    if (interaction.isAutocomplete()) {
        const command = bot.commands.get(interaction.commandName);
        if (!command || !command.autocomplete) return;
        try { await command.autocomplete(interaction); } catch (error) { console.error('Autocomplete error:', error); }
        return;
    }

    if (!interaction.isCommand()) return;
    const command = bot.commands.get(interaction.commandName);
    if (!command) return;
    if (interaction.user.id === bot.user.id) return;
    await database.getServerSettings(interaction.guild.id, async serverSettings => {
        let language
        try { language = serverSettings.language } catch { language = defaultLanguage }
        try {
            const isLegacyPublic = ["data", "verify", "globalstats"].includes(interaction.commandName);
            const isExplicitlyPublic = command.adminOnly === false;
            const isUserAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);

            if (isUserAdmin || isLegacyPublic || isExplicitlyPublic) {
                await command.execute(interaction);
            } else {
                await interaction.reply({ content: getLocale(language, "invalidPermissions"), flags: MessageFlags.Ephemeral });
            }
        } catch (error) {
            console.error(error);
            await ErrorNotifier.notify({ guild: interaction.guild, errorTitle: 'Command Execution Error', errorMessage: `Command \`/${interaction.commandName}\` failed with error:\n\`\`\`${error.message || error}\`\`\``, user: interaction.user, interaction: interaction, language: language })
        }
    })
});

// SIGINT handler removed to allow db.js to cleanly close the SQLite database before process exit

bot.login(token).catch((e) => {
    console.log("Failed to login: " + e.toString())
    process.exitCode = 1;
});

```

# src\gemini\getGeminiResponse.js

```js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function addInlineCitations(response) {
    let text = response.text();
    const supports = response.candidates?.[0]?.groundingMetadata?.groundingSupports;
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (!supports?.length || !chunks?.length) return text;

    const sorted = [...supports].sort(
        (a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0)
    );

    for (const support of sorted) {
        const endIndex = support.segment?.endIndex;
        if (endIndex === undefined || !support.groundingChunkIndices?.length) continue;

        const citationLinks = support.groundingChunkIndices
            .map(i => {
                const uri = chunks[i]?.web?.uri;
                if (!uri) return null;
                const title = chunks[i]?.web?.title || `${i + 1}`;
                if (uri.includes('utm.my') || uri.includes('utm.gitbook.io')) {
                    return `[${title}](${uri})`;
                }
                return `[${i + 1}](${uri})`;
            })
            .filter(Boolean);

        if (citationLinks.length > 0) {
            const citation = ` ${citationLinks.join(" ")}`;
            text = text.slice(0, endIndex) + citation + text.slice(endIndex);
        }
    }

    return text;
}

async function getGeminiResponse(prompt) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
You are an AI assistant designed to help users find and understand information from two sources:
[https://utm.gitbook.io/](https://utm.gitbook.io/) – community-maintained guides, notes, references, and student-written documentation.
[https://utm.my/](https://utm.my/) – Official Universiti Teknologi Malaysia website containing authoritative information such as academic regulations, faculty details, services, and announcements.
And any relevant subdomains.

# Objectives
- Provide clear, accurate, and concise answers using information from the sources above.
- When relevant, guide users to the exact section or page that can answer their question.
- If the requested information does not exist on either site, state that clearly and provide the closest alternative guidance.

# Rules and Behaviours
- Use proper Markdown formatting
- Use utm.gitbook.io for community explanations, tutorials, and student resources.
- Use utm.my for verified, official details and policies.
- Do not invent information, policies, staff names, or internal procedures that are not publicly available.
- Keep responses factual, neutral, and helpful.
- Do always include your relevant sources URL, at the end of the message using markdown.
- IMPORTANT: When citing sources, use this exact format:

**Sources:**
1. [Page Title](full URL)
2. [Page Title](full URL)

- Do not claim to be an official representative of UTM.

# What the Assistant Can Do
- Summarize content they would find on either site.
- Provide step-by-step instructions for common tasks covered by the GitBook or the official site.
- Suggest where to find additional information when the answer is not directly available.

# What the Assistant Must Not Do
- Do not generate unverified policies or details.
- Do not fabricate names, contact information, or administrative procedures.
- Do not reference or rely on external sources outside utm.gitbook.io and utm.my.
- Do not speculate beyond the available information.
- Do not pretend to be official.
- Do NOT MENTION University of Toronto Mississauga (UTM) AT ALL. This is forbidden
- Do NOT GO OVER 1000 CHARACTERS IN YOUR RESPONSE
- Do NOT speak about anything unrelated to Universiti Teknologi Malaysia, whatever the case may be.

Before answering any question, search ONLY the two allowed domains:
- utm.gitbook.io
- utm.my
- any subdomains
`,
            tools: [{ googleSearch: {} }]
        });

        const result = await model.generateContent(prompt);
        const text = addInlineCitations(result.response);

        return text;
    } catch (err) {
        const message = err.message || "Unknown error";
        console.error("Gemini error:", message);
        return `⚠️  # Error\n${message}`;
    }
}

module.exports = { getGeminiResponse };

```

# src\Language.js

```js
const fs = require("fs");

const languageFiles = fs.readdirSync('./language').filter(file => file.endsWith('.json'));
const languages = new Map()

const defaultLanguage = "english"

for (const file of languageFiles) {
    const language = require(`../language/${file}`)
    const name = file.split(".")[0]
    languages.set(name, language)
}

// Function to get locales and replace variables
function getLocale(language, string, ...vars) {

    let locale = languages.get(language)[string];

    if (locale === undefined) {
        locale = languages.get(defaultLanguage)[string];
    }
    if (locale === undefined) {
        return "ERROR: Can't find message!"
    }


    let count = 0;
    locale = locale.replace(/%VAR%/g, () => {
        let variable = vars[count] !== null ? vars[count] : "%VAR%"
        count += 1
        return variable
    });

    return locale;
}

module.exports = {getLocale, languages, defaultLanguage}
```

# src\mail\MailSender.js

```js
let {smtpHost, email, username, password, isGoogle, isSecure, smtpPort} = require("../../config/config.json");

const nodemailer = require("nodemailer");
const {defaultLanguage, getLocale} = require("../Language");
const database = require("../database/Database");
const { MessageFlags, EmbedBuilder } = require('discord.js');

if (typeof username === 'undefined') {
    username = email;
}

module.exports = class MailSender {
    constructor(serverStatsAPI) {
        this.serverStatsAPI = serverStatsAPI;

        let nodemailerOptions = {
            host: smtpHost,
            port: smtpPort || 587,
            secure: isSecure || false,
            name: smtpHost,
            auth: {
                user: username,
                pass: password
            },
            tls: {
                rejectUnauthorized: true
            }
        };

        if (isGoogle) {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: username,
                    pass: password
                }
            });
        } else {
            this.transporter = nodemailer.createTransport(nodemailerOptions);
        }
    }

    /**
     * Send verification email
     * @param {string} toEmail - Email address to send to
     * @param {string} code - Verification code
     * @param {string} name - Server name
     * @param {Interaction} interaction - Discord interaction (modal/button)
     * @param {boolean} emailNotify - Whether to log email events to console
     * @param {Function} callback - Called with accepted email on success
     */
    async sendEmail(toEmail, code, name, interaction, emailNotify, callback) {
        const serverId = interaction.guildId;

        await database.getServerSettings(serverId, async serverSettings => {
            const language = serverSettings.language || defaultLanguage;

            const plainText = getLocale(language, "emailText", name, code);
            const emailSubject = getLocale(language, "emailSubject");
            const emailSenderName = getLocale(language, "emailSenderName");

            const mailOptions = {
                from: `"${emailSenderName}" <${username}>`,
                to: toEmail,
                subject: emailSubject,
                text: plainText,
                html: this.#buildModernHtmlEmail(name, code),
                headers: {
                    'X-Mailer': 'UTMJBC Bot',
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high',
                    'List-Unsubscribe': `<mailto:${username}?subject=unsubscribe>`,
                    'X-Auto-Response-Suppress': 'OOF, DR, RN, NRN, AutoReply'
                }
            };

            if (!isGoogle) mailOptions["bcc"] = email;

            this.transporter.sendMail(mailOptions, async (error, info) => {
                if (error || info.rejected.length > 0) {
                    if (emailNotify) {
                        console.log('EMAIL ERROR for:', toEmail);
                        console.log('Error details:', error);
                        if (info && info.rejected.length > 0) console.log('Rejected emails:', info.rejected);
                        if (info && info.response) console.log('SMTP Response:', info.response);
                    }

                    const errorEmbed = new EmbedBuilder()
                        .setTitle(getLocale(language, "mailFailedTitle"))
                        .setDescription(getLocale(language, "mailFailedDescription", toEmail))
                        .setColor(0xED4245);

                    if (interaction.deferred || interaction.replied) {
                        await interaction.followUp({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral }).catch(() => {});
                    } else {
                        await interaction.reply({ embeds: [errorEmbed], flags: MessageFlags.Ephemeral }).catch(() => {});
                    }
                } else {
                    this.serverStatsAPI.increaseMailSend();
                    database.incrementMailsSent(serverId);
                    callback(info.accepted[0]);
                    if (emailNotify) {
                        console.log('EMAIL SUCCESS for:', toEmail);
                        console.log('Accepted emails:', info.accepted);
                        console.log('Message ID:', info.messageId);
                        console.log('SMTP Response:', info.response);
                    }
                }
            });
        });
    }

    #escapeHtml(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    #buildModernHtmlEmail(serverName, code) {
        const safeServerName = this.#escapeHtml(serverName || '');
        const safeCode = this.#escapeHtml(code || '');

        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <style type="text/css">
    body { width: 100% !important; -webkit-text-size-adjust: 100%; margin: 0; padding: 0; background-color: #1a0008; font-family: 'Poppins', Arial, sans-serif; }
    img { outline: none; text-decoration: none; border: none; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 600px) {
      .main-table { width: 100% !important; }
      .content-cell { padding-left: 20px !important; padding-right: 20px !important; }
    }
  </style>
</head>
<body bgcolor="#1a0008" style="margin: 0; padding: 0; background-color: #1a0008;">

  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#1a0008">
    <tr>
      <td align="center" valign="top" style="padding: 40px 10px;">

        <table class="main-table" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#2a0010" style="background-color: #2a0010; border: 1px solid #5A001C; border-radius: 8px;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 40px 20px 24px;">
              <img src="https://i.imgur.com/GmnbsON.png" alt="UTM JBC" width="220" style="display: block; width: 220px; height: auto;">
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding: 0 40px 24px;">
              <h1 style="color: #E69305; font-family: 'Poppins', Arial, sans-serif; font-size: 22px; font-weight: 700; margin: 0; line-height: 1.3;">Welcome! Salam Sejahtara!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content-cell" style="padding: 0 40px 32px; font-family: 'Poppins', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #e2d0d6;">

              <p style="margin: 0 0 16px 0;">To ensure that this is a safe space for UTM students only, we require new members to verify. Upon verification, you will gain access to a number of different channels; such as faculty channels, UTM discussion and so much more!</p>

              <p style="margin: 0 0 24px 0;">Please enter the following code in Discord to complete your verification:</p>

              <!-- Code Block -->
              <div style="text-align: center; margin: 24px 0;">
                <span style="display: inline-block; font-family: 'Poppins', Arial, sans-serif; font-size: 28px; letter-spacing: 6px; padding: 14px 28px; background: #5A001C; color: #E69305; border: 1px solid #E69305; border-radius: 8px; font-weight: 700;">${safeCode}</span>
              </div>

              <p style="margin: 24px 0 0 0; color: #E69305; font-weight: 600; font-size: 14px; text-align: center;">⚠️  Do NOT share this code with anyone other than the UTMJBC Bot.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #5A001C; margin: 0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" bgcolor="#1a0008" style="padding: 24px 40px; background-color: #1a0008;">
              <p style="color: #b08090; font-family: 'Poppins', Arial, sans-serif; font-size: 12px; line-height: 1.6; margin: 0 0 12px;">For any queries, feel free to reply to this email and we'll get back to you.</p>

              <!-- Footer Links -->
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px;">
                <tr>
                  <td style="padding: 0 12px;">
                    <a href="https://utm.gitbook.io/" target="_blank" style="color: #E69305; font-family: 'Poppins', Arial, sans-serif; font-size: 12px; font-weight: 600; text-decoration: none; border-bottom: 1px solid #E69305; padding-bottom: 1px;">📖 Community Guide</a>
                  </td>
                  <td style="padding: 0 12px; border-left: 1px solid #5A001C;">
                    <a href="https://discord.gg/vuGTVyFgck" target="_blank" style="color: #E69305; font-family: 'Poppins', Arial, sans-serif; font-size: 12px; font-weight: 600; text-decoration: none; border-bottom: 1px solid #E69305; padding-bottom: 1px;">💬 Join Discord</a>
                  </td>
                </tr>
              </table>

              <a href="mailto:utmjbc@gmail.com" style="color: #b08090; font-family: 'Poppins', Arial, sans-serif; font-size: 11px; font-weight: 400; text-decoration: none; letter-spacing: 0.5px;">utmjbc@gmail.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    }
}

```

# src\ServerStats.js

```js
'use strict';
const fs = require("fs");
module.exports = class ServerStats {
    constructor(getServerCountFn = null) {
        this.mailsSendAll = 0
        this.mailsSendToday = 0
        this.usersVerifiedAll = 0
        this.usersVerifiedToday = 0
        this.lastDate = new Date()
        this.fileName = "config/ServerStats.json"
        this.historyFileName = "config/ServerStatsHistory.log"
        this.getServerCount = getServerCountFn
        if (!fs.existsSync(this.fileName)) {
            this.updateFile()
        }
        const data = fs.readFileSync(this.fileName, {encoding: 'utf8', flag: 'r'});

        try {
            let serverStats = JSON.parse(data);
            this.mailsSendAll = serverStats.mailsSendAll
            this.mailsSendToday = serverStats.mailsSendToday
            this.usersVerifiedAll = serverStats.usersVerifiedAll || 0
            this.usersVerifiedToday = serverStats.usersVerifiedToday || 0
            if (serverStats.lastDate) {
                this.lastDate = new Date(serverStats.lastDate)
            }
        } catch {
            this.updateFile()
        }
    }

    async increaseMailSend() {
        await this.testDate()
        this.mailsSendAll += 1
        this.mailsSendToday += 1
        this.updateFile()
    }

    async increaseVerifiedUsers() {
        await this.testDate()
        this.usersVerifiedAll += 1
        this.usersVerifiedToday += 1
        this.updateFile()
    }

    async testDate() {
        const date = new Date();
        if (date.getUTCDate() !== this.lastDate.getUTCDate()) {
            // Save yesterday's stats to history before resetting
            await this.appendDailyStats()
            this.lastDate = date
            this.mailsSendToday = 0
            this.usersVerifiedToday = 0
            console.log("RESET")
            this.updateFile()
        }
    }

    async appendDailyStats() {
        const dateStr = this.lastDate.toISOString().split('T')[0]
        let serverCount = 0
        if (this.getServerCount) {
            try {
                serverCount = await this.getServerCount()
            } catch {}
        }
        const logLine = `${dateStr},${this.mailsSendToday},${this.mailsSendAll},${this.usersVerifiedToday},${this.usersVerifiedAll},${serverCount}\n`
        fs.appendFileSync(this.historyFileName, logLine)
        console.log(`Saved daily stats: ${logLine.trim()}`)
    }

    updateFile() {
        fs.writeFileSync(this.fileName, JSON.stringify({
            mailsSendAll: this.mailsSendAll,
            mailsSendToday: this.mailsSendToday,
            usersVerifiedAll: this.usersVerifiedAll,
            usersVerifiedToday: this.usersVerifiedToday,
            lastDate: this.lastDate.toISOString()
        }))
    }
}
```

# src\sharder.js

```js
const { ShardingManager } = require('discord.js');
const path = require('path');
const { token, topggToken } = require('../config/config.json');
const { AutoPoster } = require('topgg-autoposter');

const manager = new ShardingManager(path.join(__dirname, 'EmailBot.js'), {
  token,
  totalShards: 'auto',
  respawn: true,
});

manager.on('shardCreate', (shard) => {
  console.log(`Launched shard ${shard.id}`);
});

(async () => {
  try {
    await manager.spawn();
    if (typeof topggToken !== 'undefined') {
      const poster = AutoPoster(topggToken, manager);
      poster.on('error', () => {});
      console.log('Posting stats to topGG via manager!');
    } else {
      console.log('No topGG token!');
    }
  } catch (error) {
    console.error('Failed to spawn shards:', error);
    process.exit(1);
  }
})();



```

# src\shared\db.js

```js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let config = {};
try { config = require('../../config/config.json'); } catch {}

const legacyDbPath = path.join(__dirname, '../../data/telegram_events.db');

// Use an explicit persistent path from config if set (recommended for hosted environments
// where the app directory may be recreated on deploy). Falls back to the local data/ folder.
const dbDir = config.dbPath
    ? path.resolve(config.dbPath)
    : path.join(__dirname, '../../data');

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const targetDbPath = path.join(dbDir, 'telegram_events.db');

// Auto-copy existing legacy database to persistent path on first run
if (targetDbPath !== legacyDbPath && !fs.existsSync(targetDbPath) && fs.existsSync(legacyDbPath)) {
    console.log(`[Database] Copying existing telegram_events.db from legacy path to persistent location...`);
    fs.copyFileSync(legacyDbPath, targetDbPath);
}

const db = new sqlite3.Database(targetDbPath);
console.log(`[Database] Using database at: ${targetDbPath}`);

db.serialize(() => {
    // ── Seen messages (dedup by ID + content hash + SimHash fingerprint) ──────
    db.run(`CREATE TABLE IF NOT EXISTS seen_messages (
        message_id   TEXT PRIMARY KEY,
        channel      TEXT,
        content_hash TEXT,
        simhash      TEXT,
        posted_at    INTEGER
    )`);
    // Upgrade paths for old DBs — silently ignored if columns already exist
    db.run(`ALTER TABLE seen_messages ADD COLUMN content_hash TEXT`, () => {});
    db.run(`ALTER TABLE seen_messages ADD COLUMN simhash TEXT`,      () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_content_hash ON seen_messages (content_hash)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_simhash      ON seen_messages (simhash)`);

    // ── Telegram channel list (replaces config.telegramChannels array) ───────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_channels (
        channel_id TEXT PRIMARY KEY,
        channel_name TEXT,
        added_by   TEXT,
        added_at   INTEGER
    )`);
    db.run(`ALTER TABLE telegram_channels ADD COLUMN channel_name TEXT`, () => {});

    // ── Telegram events (stores event info for discord buttons + title dedup) ─
    db.run(`CREATE TABLE IF NOT EXISTS telegram_events (
        thread_id        TEXT PRIMARY KEY,
        title            TEXT,
        benefits         TEXT,
        registration_url TEXT,
        event_end_date   TEXT,
        title_hash       TEXT,
        posted_at        INTEGER,
        closed           INTEGER DEFAULT 0
    )`);
    db.run(`ALTER TABLE telegram_events ADD COLUMN event_end_date TEXT`,        () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN closed INTEGER DEFAULT 0`,    () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN title_hash TEXT`,             () => {});
    db.run(`ALTER TABLE telegram_events ADD COLUMN posted_at INTEGER`,           () => {});
    db.run(`CREATE INDEX IF NOT EXISTS idx_title_hash ON telegram_events (title_hash)`);

    // ── Telegram blacklist ──────────────────────────────────────────────────
    db.run(`CREATE TABLE IF NOT EXISTS telegram_blacklist (
        keyword TEXT PRIMARY KEY,
        added_by TEXT,
        added_at INTEGER
    )`);

    // ── Migration: Normalize legacy positive numeric IDs to -100 prefixed ───
    db.all(`SELECT channel_id FROM telegram_channels`, [], (err, rows) => {
        if (!err && rows) {
            rows.forEach(row => {
                if (/^\d+$/.test(row.channel_id)) {
                    const newId = '-100' + row.channel_id;
                    db.run(`UPDATE telegram_channels SET channel_id = ? WHERE channel_id = ?`, [newId, row.channel_id]);
                }
            });
        }
    });
    db.all(`SELECT message_id, channel FROM seen_messages`, [], (err, rows) => {
        if (!err && rows) {
            rows.forEach(row => {
                if (/^\d+$/.test(row.channel)) {
                    const newChannel = '-100' + row.channel;
                    // Fix composite message_id that contains the old channel ID
                    const newMessageId = row.message_id.startsWith(row.channel + '_') 
                        ? row.message_id.replace(row.channel + '_', newChannel + '_')
                        : row.message_id;
                    db.run(`UPDATE seen_messages SET channel = ?, message_id = ? WHERE channel = ? AND message_id = ?`, 
                        [newChannel, newMessageId, row.channel, row.message_id]);
                }
            });
        }
    });
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
// Closes the DB cleanly before exit so SQLite doesn't leave a corrupt/locked file
// on Ctrl+C, Docker restarts, or server reboots mid-write

function closeDb(signal) {
    console.log(`\n[System] ${signal} received — closing database...`);
    db.close((err) => {
        if (err) console.error('[Database] Error closing DB:', err.message);
        else console.log('[Database] Closed successfully.');
        process.exit(0);
    });
}

process.on('SIGINT',  () => closeDb('SIGINT'));
process.on('SIGTERM', () => closeDb('SIGTERM'));

module.exports = db;

```

# src\shared\state.js

```js
// Shared mutable state imported by both TelegramListener and Discord command handlers.
// Using a single object reference means mutations are visible across all importers.

const state = {
    // Set to the connected TelegramClient instance once TelegramListener.start() completes.
    // Command handlers check for null before attempting to use it.
    telegramClient: null,

    // Scraping lock — prevents concurrent scrape cycles if /scrape is spammed
    // or if a cron tick fires while a manual scrape is still running.
    isScraping: false,
};

module.exports = state;

```

# src\telegram\ChannelManager.js

```js
const db = require('../shared/db');

// Returns all tracked channel IDs as a plain string array
function getChannels() {
    return new Promise((resolve, reject) => {
        db.all('SELECT channel_id FROM telegram_channels ORDER BY added_at ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows.map(r => r.channel_id));
        });
    });
}

// Returns full rows (channel_id, added_by, added_at) for display purposes
function getChannelDetails() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM telegram_channels ORDER BY added_at ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function channelExists(channelId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM telegram_channels WHERE channel_id = ?',
            [String(channelId)],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

// Returns true if the row was inserted (false if it already existed)
function addChannel(channelId, channelName, addedBy) {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT OR IGNORE INTO telegram_channels (channel_id, channel_name, added_by, added_at) VALUES (?, ?, ?, ?)',
            [String(channelId), channelName || null, addedBy, Date.now()],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

function updateChannelName(channelId, channelName) {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE telegram_channels SET channel_name = ? WHERE channel_id = ?',
            [channelName, String(channelId)],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Returns true if the row was deleted (false if it didn't exist)
function removeChannel(channelId) {
    return new Promise((resolve, reject) => {
        db.run(
            'DELETE FROM telegram_channels WHERE channel_id = ?',
            [String(channelId)],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

function clearSeenMessages() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM seen_messages', function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}

module.exports = { 
    getChannels, 
    getChannelDetails, 
    channelExists, 
    addChannel, 
    updateChannelName, 
    removeChannel, 
    clearSeenMessages 
};

```

# src\telegram\DiscordPublisher.js

```js
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db         = require('../shared/db');
const { logError } = require('./logger');

// ─── Constants ────────────────────────────────────────────────────────────────

const EVENT_TYPE_EMOJI = {
    'Club Activity':                  '🎯',
    'Club Recruitment':               '📣',
    'Club Announcement':              '📋',
    'Competition / Hackathon':        '🏆',
    'Talk / Seminar / Workshop':      '🎤',
    'Faculty / Department Event':     '🏫',
    'University-wide Event':          '🎓',
    'External / Collaboration Event': '🤝',
};

const EMBED_COLORS = [
    0x3498db, 0x2ecc71, 0x9b59b6, 0xe67e22,
    0x1abc9c, 0xe91e63, 0xf1c40f, 0x00bcd4,
    0xff5722, 0x8bc34a,
];

const TOPIC_TAGS = {
    'Tech/Coding':          '1519277264661909554',
    'Sports':               '1519277357431525437',
    'Arts/Culture':         '1519277384107429908',
    'Business/Career':      '1519277415388549241',
    'Self-Dev':             '1519277443771269131',
    'Community/Volunteer':  '1519277473190383616',
    'Academic/Science':     '1519277534045278248'
};

const META_TAGS = {
    'Merit':    '1519276701262282792',
    'Paid':     '1519276747961536632',
    'Free':     '1519276780719050832',
    'External': '1519278024506216609'
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomEmbedColor() {
    return EMBED_COLORS[Math.floor(Math.random() * EMBED_COLORS.length)];
}

/**
 * Generates a Google Calendar deep-link prefilled with event metadata.
 * Returns an empty string if the event has no start date.
 */
function generateGoogleCalendarUrl(eventData) {
    if (!eventData.startDate || !eventData.startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return '';
    }

    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const start   = eventData.startDate.replace(/-/g, '');
    let   end     = eventData.eventEndDate && eventData.eventEndDate.match(/^\d{4}-\d{2}-\d{2}$/)
        ? eventData.eventEndDate.replace(/-/g, '')
        : start;

    let datesParam = '';

    if (eventData.startTime && typeof eventData.startTime === 'string') {
        const startTimeStr = eventData.startTime.replace(/:/g, '') + '00';

        let endTimeStr;
        if (eventData.endTime && typeof eventData.endTime === 'string') {
            endTimeStr = eventData.endTime.replace(/:/g, '') + '00';
        } else {
            const parts   = eventData.startTime.split(':');
            const hour    = Number(parts[0]);
            const nextHour = String((hour + 1) % 24).padStart(2, '0');
            const min     = parts[1] || '00';
            endTimeStr    = `${nextHour}${min}00`;
        }

        datesParam = `${start}T${startTimeStr}/${end}T${endTimeStr}`;
    } else {
        // All-day event — end date is exclusive in Google Calendar templates
        let exclusiveEnd = start;
        const endDateSource = eventData.eventEndDate || eventData.startDate;
        if (endDateSource && endDateSource.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [y, m, d] = endDateSource.split('-').map(Number);
            const endDateObj = new Date(Date.UTC(y, m - 1, d + 1));
            exclusiveEnd = `${endDateObj.getUTCFullYear()}${String(endDateObj.getUTCMonth() + 1).padStart(2, '0')}${String(endDateObj.getUTCDate()).padStart(2, '0')}`;
        }
        datesParam = `${start}/${exclusiveEnd}`;
    }

    let url = `${baseUrl}&text=${encodeURIComponent(eventData.title || 'UTM Event')}`;
    if (datesParam)         url += `&dates=${datesParam}`;
    if (eventData.location) url += `&location=${encodeURIComponent(eventData.location)}`;
    url += `&details=${encodeURIComponent('Sourced from Telegram UTM event scraper. View Discord thread for full details.')}`;

    // Discord button URLs max 512 characters — truncate gracefully
    if (url.length > 500) {
        url = `${baseUrl}&text=${encodeURIComponent((eventData.title || 'UTM Event').slice(0, 50))}`;
        if (datesParam)         url += `&dates=${datesParam}`;
        if (eventData.location) url += `&location=${encodeURIComponent(eventData.location.slice(0, 50))}`;
        url += `&details=${encodeURIComponent('View Discord details.')}`;
    }

    return url;
}

// ─── Main Post Function ───────────────────────────────────────────────────────

/**
 * Builds a Discord embed from Gemini event data and creates a forum thread.
 * Also persists the thread to the `telegram_events` table.
 *
 * @param {import('discord.js').ForumChannel} discordChannel
 * @param {object}  eventData       - Structured data returned by analyseWithGemini
 * @param {string}  channelUsername - Human-readable source channel name
 * @param {string}  originalText    - Raw Telegram message text (fallback for description)
 * @param {string}  titleHash       - Normalised title hash (stored for cross-channel dedup)
 */
async function postToDiscord(discordChannel, eventData, channelUsername, originalText, titleHash) {
    // ── Description ────────────────────────────────────────────────────────────
    let descriptionText = eventData.exactText || originalText || '';

    // Unescape any literal \n sequences that survived JSON round-tripping
    descriptionText = descriptionText
        .replace(/\\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n');

    const truncatedDescription = descriptionText.length > 4096
        ? descriptionText.slice(0, 4090) + '…'
        : descriptionText;

    // ── Title ──────────────────────────────────────────────────────────────────
    const rawTitle  = eventData.title || 'Event Announcement';
    const safeTitle = rawTitle.length > 95 ? rawTitle.slice(0, 95) + '...' : rawTitle;

    // ── Embed ──────────────────────────────────────────────────────────────────
    const embed = new EmbedBuilder()
        .setTitle(safeTitle)
        .setDescription(truncatedDescription)
        .setColor(randomEmbedColor())
        .addFields(
            { name: '🗂️ Type',      value: eventData.type     || 'Not specified', inline: true },
            { name: '📆 Date/Time', value: eventData.date     || 'Not specified', inline: true },
            { name: '📍 Location',  value: eventData.location || 'Not specified', inline: true },
            { name: '📢 Source',    value: `${channelUsername}`,                  inline: true },
            { name: '🏅 UTM Merit', value: eventData.merit ? 'Yes' : 'No',       inline: true },
            { name: '💰 Cost',      value: eventData.cost     || 'Not specified', inline: true }
        )
        .setFooter({ text: 'UTMJBC Event Feed • Sourced from Telegram' })
        .setTimestamp();

    // ── Tags ───────────────────────────────────────────────────────────────────
    const appliedTags = [];
    if (eventData.topic && TOPIC_TAGS[eventData.topic]) appliedTags.push(TOPIC_TAGS[eventData.topic]);
    if (eventData.merit)                                 appliedTags.push(META_TAGS['Merit']);
    if (eventData.cost?.toLowerCase() === 'free')        appliedTags.push(META_TAGS['Free']);
    if (eventData.cost?.toLowerCase().includes('paid'))  appliedTags.push(META_TAGS['Paid']);
    if (eventData.type === 'External / Collaboration Event') appliedTags.push(META_TAGS['External']);
    const finalTags = appliedTags.slice(0, 5);

    // ── Buttons ────────────────────────────────────────────────────────────────
    const components = [];
    const row        = new ActionRowBuilder();

    if (eventData.registrationUrl) {
        let url = eventData.registrationUrl;
        if (!url.startsWith('http')) url = 'https://' + url;
        row.addComponents(
            new ButtonBuilder()
                .setLabel('Register Now')
                .setStyle(ButtonStyle.Link)
                .setURL(url)
        );
    }
    if (eventData.startDate) {
        const calUrl = generateGoogleCalendarUrl(eventData);
        if (calUrl) {
            row.addComponents(
                new ButtonBuilder()
                    .setLabel('Add to Calendar')
                    .setStyle(ButtonStyle.Link)
                    .setURL(calUrl)
                    .setEmoji('📅')
            );
        }
    }
    if (row.components.length > 0) components.push(row);

    // ── Create Thread ──────────────────────────────────────────────────────────
    const payload = { name: safeTitle, message: { embeds: [embed] } };
    if (components.length > 0) payload.message.components = components;
    if (finalTags.length > 0)  payload.appliedTags = finalTags;

    try {
        const thread = await discordChannel.threads.create(payload);

        db.run(
            `INSERT INTO telegram_events
                 (thread_id, title, registration_url, event_end_date, title_hash, posted_at, closed)
             VALUES (?, ?, ?, ?, ?, ?, 0)`,
            [
                thread.id,
                rawTitle,
                eventData.registrationUrl || null,
                eventData.eventEndDate    || null,
                titleHash                 || null,
                Date.now()
            ]
        );
    } catch (err) {
        logError(`[DiscordPublisher] Discord API Error creating forum thread: ${err.message}`);
        if (err.rawError) logError(JSON.stringify(err.rawError));
        throw err; // rethrow so scrapeChannel can handle it
    }
}

module.exports = { postToDiscord };

```

# src\telegram\GeminiAnalyser.js

```js
const { detectMalay } = require('./MessageChecker');
const { logError }    = require('./logger');

// ─── Gemini Event Analyser ────────────────────────────────────────────────────
//
// Sends a Telegram message to Gemini 2.5 Flash and extracts structured event
// data from it. Returns { isEvent: false } for non-events and { _error: true }
// on API failure.

async function analyseWithGemini(text) {
    const today = new Date().toLocaleDateString('en-MY', {
        weekday: 'long',
        year:    'numeric',
        month:   'long',
        day:     'numeric'
    });

    const isMalay = detectMalay(text);

    const systemInstruction = `You are an expert Event Data Extractor for Universiti Teknologi Malaysia (UTM).
Today's Date: ${today}.

<rules>
RULE 1: A message IS an event if a student can Attend, Register, Apply, or Compete as a direct result of it.
Classify it as a Club Announcement if it is an internal update or reminder for existing members.
These are NOT events and must return { "isEvent": false }:
- Admin-only or EXCO-only internal meetings with no open participation
- General university news, academic policy notices, or timetable updates
- Job postings, scholarship listings, or external advertisements
- Awareness posts, tips, guides, or support service announcements
- Announcements, reminders, and notices

RULE 2: Extract the event end date as "eventEndDate" in ISO format (YYYY-MM-DD). Do NOT evaluate whether the event is past — just extract the date accurately. If you can't determine the date, return null.

RULE 3: You MUST extract the exact, original message text into 'exactText'. DO NOT summarize or truncate it. If the original message is in Malay or another language, translate the ENTIRE message into English and put the full translation into 'exactText'. CRITICAL: You MUST preserve every paragraph break and line break from the original message. Each new paragraph in the original must appear as a separate paragraph (blank line between them) in your translation. Do NOT collapse the message into a single wall of text. The 'title' field must ALWAYS be in English — never leave it empty or generic.

RULE 4: Classify as exactly one of: "Club Activity", "Club Recruitment", "Club Announcement", "Competition / Hackathon", "Talk / Seminar / Workshop", "Faculty / Department Event", "University-wide Event", "External / Collaboration Event".

RULE 5: Format date: "27 March 2026, 2:30 PM - 5:00 PM" or "27 March 2026". Resolve relative dates. If no year, assume current year. If no date, return null.

RULE 6: Cost: "Free", "Refundable Deposit - RM[X]", "Paid - RM[X]", "Paid", "Not specified".

RULE 7: Return true if UTM Merit points are mentioned anywhere, false otherwise.

RULE 8: Extract registration URL if any.

RULE 9: Topic Categorization. Choose ONE primary topic from:
- Tech/Coding
- Sports
- Arts/Culture
- Business/Career
- Self-Dev
- Community/Volunteer
- Academic/Science
- Other

RULE 10: Extract the event start date as "startDate" in ISO format (YYYY-MM-DD). If you can't determine it, return null.
RULE 11: Extract the event start time as "startTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 12: Extract the event end time as "endTime" in 24-hour format (HH:MM). If not specified, return null.
RULE 13: Set "sourceLanguage" to the original language of the message (e.g. "English", "Malay", "Mixed").
</rules>

<critical>
The 'title' field is MANDATORY for events. You MUST always provide a clear, descriptive English event title. NEVER return an empty title or a generic title like "Event" or "Event Announcement".
The 'exactText' field is MANDATORY for events. You MUST always populate it. NEVER collapse multi-paragraph messages into a single paragraph.
</critical>

<task>
Analyse the message and extract the required fields as per the strict JSON schema.
</task>`;

    let promptText = `MESSAGE:\n"""\n${text}\n"""`;
    if (isMalay) {
        promptText =
            `[LANGUAGE HINT: This message is in Malay. You MUST:\n` +
            `1. Translate the ENTIRE message content into English.\n` +
            `2. Preserve every paragraph break and line break from the original. ` +
            `Each paragraph must be separated by a blank line in the translation.\n` +
            `3. The 'title' and 'exactText' MUST be in English.]\n\n` +
            promptText;
    }

    const schema = {
        type: 'object',
        properties: {
            isEvent:         { type: 'boolean' },
            type:            { type: 'string' },
            topic:           { type: 'string' },
            title:           { type: 'string' },
            date:            { type: 'string',  nullable: true },
            startDate:       { type: 'string',  nullable: true },
            eventEndDate:    { type: 'string',  nullable: true },
            startTime:       { type: 'string',  nullable: true },
            endTime:         { type: 'string',  nullable: true },
            location:        { type: 'string',  nullable: true },
            exactText:       { type: 'string' },
            merit:           { type: 'boolean' },
            cost:            { type: 'string' },
            registrationUrl: { type: 'string',  nullable: true },
            sourceLanguage:  { type: 'string' }
        },
        required: ['isEvent', 'title', 'exactText', 'type', 'topic', 'merit', 'cost', 'sourceLanguage']
    };

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemInstruction: { parts: [{ text: systemInstruction }] },
                    contents: [
                        // Few-shot example 1: English event
                        {
                            role: 'user',
                            parts: [{ text: 'Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev.' }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: JSON.stringify({
                                isEvent:         true,
                                type:            'Talk / Seminar / Workshop',
                                topic:           'Tech/Coding',
                                title:           'UTM Web Dev Workshop',
                                date:            'Tomorrow, 2:30 PM - 5:00 PM',
                                startDate:       '2026-06-25',
                                eventEndDate:    '2026-06-25',
                                startTime:       '14:30',
                                endTime:         '17:00',
                                location:        'N24',
                                exactText:       'Join our UTM web dev workshop! Tomorrow from 2:30 PM to 5:00 PM at N24. Free entry and merit given. Register at bit.ly/webdev.',
                                merit:           true,
                                cost:            'Free',
                                registrationUrl: 'bit.ly/webdev',
                                sourceLanguage:  'English'
                            }) }]
                        },
                        // Few-shot example 2: Non-event
                        {
                            role: 'user',
                            parts: [{ text: 'Just a reminder that our weekly meeting for EXCO members is tonight at 8pm.' }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: JSON.stringify({
                                isEvent:        false,
                                title:          '',
                                exactText:      '',
                                type:           'Club Announcement',
                                topic:          'Other',
                                merit:          false,
                                cost:           'Not specified',
                                sourceLanguage: 'English'
                            }) }]
                        },
                        // Few-shot example 3: Malay event with preserved paragraphs
                        {
                            role: 'user',
                            parts: [{ text: '[LANGUAGE HINT: This message is in Malay. You MUST:\n1. Translate the ENTIRE message content into English.\n2. Preserve every paragraph break and line break from the original. Each paragraph must be separated by a blank line in the translation.\n3. The \'title\' and \'exactText\' MUST be in English.]\n\nMESSAGE:\n"""\n🎓 BENGKEL PEMBANGUNAN WEB UTM 2026\n\nTarikh: 28 Jun 2026 (Sabtu)\nMasa: 9:00 pagi - 1:00 tengahari\nLokasi: Makmal Komputer N28\n\nPercuma untuk semua pelajar UTM!\nMerit diberikan kepada semua peserta.\n\nDaftar sekarang: bit.ly/webdev2026\n"""' }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: JSON.stringify({
                                isEvent:         true,
                                type:            'Talk / Seminar / Workshop',
                                topic:           'Tech/Coding',
                                title:           'UTM Web Development Workshop 2026',
                                date:            '28 June 2026, 9:00 AM - 1:00 PM',
                                startDate:       '2026-06-28',
                                eventEndDate:    '2026-06-28',
                                startTime:       '09:00',
                                endTime:         '13:00',
                                location:        'Computer Lab N28',
                                exactText:       '🎓 UTM WEB DEVELOPMENT WORKSHOP 2026\n\nDate: 28 June 2026 (Saturday)\nTime: 9:00 AM - 1:00 PM\nLocation: Computer Lab N28\n\nFree for all UTM students!\nMerit points awarded to all participants.\n\nRegister now: bit.ly/webdev2026',
                                merit:           true,
                                cost:            'Free',
                                registrationUrl: 'bit.ly/webdev2026',
                                sourceLanguage:  'Malay'
                            }) }]
                        },
                        // Actual message
                        { role: 'user', parts: [{ text: promptText }] }
                    ],
                    generationConfig: {
                        temperature:      0.5,
                        responseMimeType: 'application/json',
                        responseSchema:   schema
                    }
                })
            }
        );

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API returned ${res.status}: ${errText}`);
        }

        const data = await res.json();
        const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text || '{"isEvent":false}';

        const parsed    = JSON.parse(raw);
        parsed._isMalay = isMalay;

        // Post-processing: unescape any literal \n sequences that survived JSON
        // serialisation, so Discord renders proper paragraph breaks.
        if (parsed.exactText) {
            parsed.exactText = parsed.exactText
                .replace(/\\n/g, '\n')
                .replace(/\n{3,}/g, '\n\n'); // collapse 3+ consecutive newlines to 2
        }

        return parsed;
    } catch (e) {
        logError(`[GeminiAnalyser] Gemini error: ${e.message}`);
        return { isEvent: false, _error: true };
    }
}

module.exports = { analyseWithGemini };

```

# src\telegram\KeywordBlacklistManager.js

```js
const db = require('../shared/db');

// Returns all blacklisted keywords in lowercase
function getKeywordBlacklist() {
    return new Promise((resolve, reject) => {
        db.all('SELECT keyword FROM telegram_blacklist ORDER BY keyword ASC', [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows.map(r => r.keyword.toLowerCase()));
        });
    });
}

// Returns true if the keyword was added (false if already exists)
function addKeywordToBlacklist(keyword, addedBy) {
    return new Promise((resolve, reject) => {
        const cleanKeyword = keyword.trim().toLowerCase();
        if (!cleanKeyword) return resolve(false);
        db.run(
            'INSERT OR IGNORE INTO telegram_blacklist (keyword, added_by, added_at) VALUES (?, ?, ?)',
            [cleanKeyword, addedBy, Date.now()],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Returns true if the keyword was removed (false if it didn't exist)
function removeKeywordFromBlacklist(keyword) {
    return new Promise((resolve, reject) => {
        const cleanKeyword = keyword.trim().toLowerCase();
        db.run(
            'DELETE FROM telegram_blacklist WHERE keyword = ?',
            [cleanKeyword],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes > 0);
            }
        );
    });
}

// Clears all blacklisted keywords
function clearKeywordBlacklist() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM telegram_blacklist', function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}

module.exports = {
    getKeywordBlacklist,
    addKeywordToBlacklist,
    removeKeywordFromBlacklist,
    clearKeywordBlacklist
};

```

# src\telegram\logger.js

```js
const fs   = require('fs');
const path = require('path');
const config = require('../../config/config.json');
const state  = require('../shared/state');

// ─── Live Log Buffer ──────────────────────────────────────────────────────────
// Batches log lines and flushes them to the Discord live-log channel every
// 2 seconds (or immediately when the buffer exceeds 1 800 characters).

let liveLogBuffer  = '';
let liveLogTimeout = null;

function flushLiveLogs() {
    if (!liveLogBuffer || !state.discordClient) return;
    const msg      = liveLogBuffer;
    liveLogBuffer  = '';
    liveLogTimeout = null;

    const targetLogChannelId = config.discordLiveLogId || '1519284305464004678';
    const logChannel = state.discordClient.channels.cache.get(targetLogChannelId);
    if (logChannel) {
        logChannel.send(`\`\`\`\n${msg.substring(0, 1990)}\n\`\`\``).catch(() => {});
    }
}

// ─── File Writer ──────────────────────────────────────────────────────────────

function appendToLog(msg) {
    const timestamp = new Date().toISOString();
    const logStr    = `[${timestamp}] ${msg}\n`;
    const logDir    = path.join(__dirname, '../../logs');
    const logPath   = path.join(logDir, 'telegram.log');

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    fs.appendFile(logPath, logStr, () => {});

    liveLogBuffer += logStr;
    if (!liveLogTimeout) {
        liveLogTimeout = setTimeout(flushLiveLogs, 2000);
    }
    if (liveLogBuffer.length > 1800) {
        clearTimeout(liveLogTimeout);
        flushLiveLogs();
    }
}

// ─── Public Log Helpers ───────────────────────────────────────────────────────

function logInfo(msg) {
    console.log(msg);
    appendToLog(`[INFO] ${msg}`);
}

function logError(msg) {
    console.error(msg);
    appendToLog(`[ERROR] ${msg}`);
}

function logWarn(msg) {
    console.warn(msg);
    appendToLog(`[WARN] ${msg}`);
}

module.exports = { logInfo, logError, logWarn };

```

# src\telegram\MessageChecker.js

```js
const crypto = require('crypto');
const db     = require('../shared/db');
const { logInfo } = require('./logger');

// ─── Language Detection ───────────────────────────────────────────────────────

const MALAY_KEYWORDS = [
    'dan', 'yang', 'untuk', 'dengan', 'dalam', 'pada', 'kepada',
    'adalah', 'ini', 'itu', 'akan', 'telah', 'tidak', 'bagi', 'atau',
    'semua', 'program', 'tarikh', 'masa', 'lokasi', 'anjuran',
    'mahasiswa', 'sila', 'salam', 'disediakan', 'daftarkan', 'percuma',
    'kolej', 'pelajar', 'universiti', 'pendaftaran', 'dianjurkan',
    'kembali', 'bersama', 'komuniti', 'aktiviti', 'pertandingan'
];

/**
 * Returns true if the text contains enough Malay vocabulary to be considered
 * a Malay-language message (threshold: 4 unique Malay keyword hits).
 */
function detectMalay(text) {
    const words     = text.toLowerCase().split(/\s+/);
    const uniqueHits = new Set(words.filter(w => MALAY_KEYWORDS.includes(w))).size;
    return uniqueHits >= 4;
}

// ─── Exact Content Hash ───────────────────────────────────────────────────────

/**
 * Normalises text and returns its MD5 hex digest.
 * Used as a cheap first-pass exact-duplicate check.
 */
function hashMessageText(text) {
    const normalized = text
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .trim();
    return crypto.createHash('md5').update(normalized).digest('hex');
}

// ─── SimHash (near-duplicate detection) ──────────────────────────────────────
//
// Produces a 64-bit locality-sensitive fingerprint for a piece of text.
// Two messages with a Hamming distance ≤ SIMHASH_THRESHOLD bits are treated
// as near-duplicates (same announcement with minor edits, emoji added, etc.).
//
// Implementation uses pure BigInt — zero npm dependencies required.

const SIMHASH_THRESHOLD = 5; // bits; configurable via config.telegramSimHashThreshold

/**
 * A simple 64-bit FNV-1a-inspired hash for a single token string.
 * Produces a stable BigInt for any given input.
 */
function _hashToken(str) {
    let h = 0xcbf29ce484222325n; // FNV offset basis (64-bit)
    for (let i = 0; i < str.length; i++) {
        h ^= BigInt(str.charCodeAt(i));
        h  = BigInt.asUintN(64, h * 0x100000001b3n); // FNV prime (64-bit)
    }
    return h;
}

/**
 * Computes the SimHash fingerprint of `text`.
 * Returns a 16-character hex string (64-bit fingerprint).
 */
function simHashText(text) {
    const tokens = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 1);

    const v = new Array(64).fill(0);

    for (const token of tokens) {
        const h = _hashToken(token);
        for (let i = 0; i < 64; i++) {
            if ((h >> BigInt(i)) & 1n) {
                v[i] += 1;
            } else {
                v[i] -= 1;
            }
        }
    }

    let fingerprint = 0n;
    for (let i = 0; i < 64; i++) {
        if (v[i] > 0) fingerprint |= (1n << BigInt(i));
    }

    return fingerprint.toString(16).padStart(16, '0');
}

/**
 * Counts the number of differing bits between two 64-bit hex fingerprints.
 */
function _hammingDistance(hexA, hexB) {
    let x    = BigInt('0x' + hexA) ^ BigInt('0x' + hexB);
    let dist = 0;
    while (x > 0n) {
        dist++;
        x &= x - 1n; // clear lowest set bit
    }
    return dist;
}

// ─── Normalised Title Hash ────────────────────────────────────────────────────

/**
 * Normalises an event title and returns its MD5 hex digest.
 * Used to detect when two different message texts describe the same event
 * (matched after Gemini extracts a title from each).
 */
function normaliseTitleHash(title) {
    const normalised = title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return crypto.createHash('md5').update(normalised).digest('hex');
}

// ─── Past-event Guard ─────────────────────────────────────────────────────────

/**
 * Returns true if the event's end/start date is strictly before today.
 * Accepts ISO date strings (YYYY-MM-DD) only.
 */
function isEventPast(eventData) {
    const dateStr = eventData.eventEndDate || eventData.startDate;
    if (!dateStr || !dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

    const now     = new Date();
    const year    = now.getFullYear();
    const month   = String(now.getMonth() + 1).padStart(2, '0');
    const day     = String(now.getDate()).padStart(2, '0');
    const todayISO = `${year}-${month}-${day}`;

    return dateStr < todayISO;
}

// ─── DB Checks ────────────────────────────────────────────────────────────────

/**
 * Returns true if this message ID (from `channelId`) has already been processed.
 */
function isAlreadySeen(messageId, channelId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM seen_messages WHERE (message_id = ? OR message_id = ?) AND channel = ?',
            [`${channelId}_${messageId}`, `${messageId}`, channelId],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

/**
 * Returns true if a message with this exact content hash has already been processed.
 */
function isAlreadySeenByHash(hash) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM seen_messages WHERE content_hash = ?',
            [hash],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

/**
 * Returns true if a recently-processed message has a SimHash fingerprint within
 * SIMHASH_THRESHOLD Hamming distance of `simhash`.
 *
 * Loads the last 500 fingerprints from the DB and compares in-memory.
 * At the bot's scale this is negligible overhead.
 */
function isNearDuplicate(simhash, threshold) {
    const effectiveThreshold = threshold ?? SIMHASH_THRESHOLD;
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT simhash FROM seen_messages WHERE simhash IS NOT NULL ORDER BY rowid DESC LIMIT 500',
            [],
            (err, rows) => {
                if (err) return reject(err);
                for (const row of rows) {
                    if (_hammingDistance(simhash, row.simhash) <= effectiveThreshold) {
                        return resolve(true);
                    }
                }
                resolve(false);
            }
        );
    });
}

/**
 * Returns true if an event with a matching (normalised) title has been posted
 * in the last 14 days, preventing cross-channel duplicates of the same event.
 */
function isTitleDuplicate(titleHash) {
    const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT 1 FROM telegram_events WHERE title_hash = ? AND posted_at > ?',
            [titleHash, fourteenDaysAgo],
            (err, row) => {
                if (err) return reject(err);
                resolve(!!row);
            }
        );
    });
}

/**
 * Records a message as seen.
 * Returns a Promise so callers can await the DB write before proceeding.
 */
function markAsSeen(messageId, channelId, hash, simhash) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT OR IGNORE INTO seen_messages
                (message_id, channel, content_hash, simhash, posted_at)
             VALUES (?, ?, ?, ?, ?)`,
            [`${channelId}_${messageId}`, channelId, hash || null, simhash || null, Date.now()],
            (err) => {
                if (err) return reject(err);
                resolve();
            }
        );
    });
}

module.exports = {
    detectMalay,
    hashMessageText,
    simHashText,
    normaliseTitleHash,
    isEventPast,
    isAlreadySeen,
    isAlreadySeenByHash,
    isNearDuplicate,
    isTitleDuplicate,
    markAsSeen,
    SIMHASH_THRESHOLD,
};

```

# src\telegram\Scraper.js

```js
const cron   = require('node-cron');
const config = require('../../config/config.json');
const state  = require('../shared/state');
const db     = require('../shared/db');

const { logInfo, logError, logWarn } = require('./logger');
const { getChannels, getChannelDetails, clearSeenMessages } = require('./ChannelManager');
const { getKeywordBlacklist } = require('./KeywordBlacklistManager');
const {
    hashMessageText,
    simHashText,
    normaliseTitleHash,
    isEventPast,
    isAlreadySeen,
    isAlreadySeenByHash,
    isNearDuplicate,
    isTitleDuplicate,
    markAsSeen,
    detectMalay,
    SIMHASH_THRESHOLD
} = require('./MessageChecker');
const { analyseWithGemini } = require('./GeminiAnalyser');
const { postToDiscord }     = require('./DiscordPublisher');

// ─── Utilities ────────────────────────────────────────────────────────────────

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Channel Scraper ──────────────────────────────────────────────────────────

/**
 * Fetches the latest messages from a Telegram channel, runs them through the
 * four-layer dedup stack, calls Gemini for event classification, and posts
 * confirmed events to Discord.
 *
 * Dedup layers (in order):
 *   1. Message ID   — exact, per-channel
 *   2. Content hash — exact MD5, cross-channel
 *   3. SimHash      — near-duplicate fingerprint (Hamming distance ≤ threshold)
 *   4. Title hash   — post-Gemini cross-channel same-event guard
 */
async function scrapeChannel(discordChannel, channelId, force = false, channelName = null, blacklist = []) {
    try {
        // Normalise legacy positive IDs to -100-prefixed form
        let parsedId = channelId;
        if (/^\d+$/.test(parsedId)) parsedId = '-100' + parsedId;

        const targetId    = /^-?\d+$/.test(parsedId) ? BigInt(parsedId) : parsedId;
        const scrapeLimit = config.telegramScrapeLimit || 20;
        const messages    = await state.telegramClient.getMessages(targetId, { limit: scrapeLimit });

        let total = 0, skippedShort = 0, skippedSeen = 0, skippedDupe = 0,
            skippedNearDupe = 0, skippedPast = 0, skippedBlacklisted = 0,
            skippedTitleDupe = 0, sentToGemini = 0, eventsFound = 0;

        logInfo(`[DEBUG] Channel ${channelId}: ${messages.length} total messages`);

        for (const msg of messages) {
            total++;

            // ── Gate 0: Skip short/empty messages ──────────────────────────
            if (!msg.message || msg.message.trim().length < 30) {
                skippedShort++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (short/empty)`);
                continue;
            }

            // ── Gate 1: Blacklist keyword filter ───────────────────────────
            if (blacklist.length > 0) {
                const matchedKeyword = blacklist.find(kw => {
                    const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
                    return regex.test(msg.message);
                });
                if (matchedKeyword) {
                    skippedBlacklisted++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (blacklisted: "${matchedKeyword}")`);
                    continue;
                }
            }

            // ── Compute hashes ONCE (fixes the const-shadowing bug) ────────
            const contentHash = hashMessageText(msg.message);
            const simhash     = simHashText(msg.message);

            if (!force) {
                // ── Gate 2: Exact message ID ────────────────────────────────
                if (await isAlreadySeen(msg.id, channelId)) {
                    skippedSeen++;
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (already seen by ID)`);
                    continue;
                }

                // ── Gate 3: Exact content hash ──────────────────────────────
                if (await isAlreadySeenByHash(contentHash)) {
                    skippedDupe++;
                    await markAsSeen(msg.id, channelId, contentHash, simhash);
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (exact duplicate content)`);
                    continue;
                }

                // ── Gate 4: Near-duplicate SimHash ──────────────────────────
                if (await isNearDuplicate(simhash)) {
                    skippedNearDupe++;
                    await markAsSeen(msg.id, channelId, contentHash, simhash);
                    logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (near-duplicate, SimHash ≤ ${SIMHASH_THRESHOLD} bits)`);
                    continue;
                }
            }

            // ── Gemini analysis ─────────────────────────────────────────────
            if (sentToGemini > 0) await sleep(4200);
            sentToGemini++;
            const langTag = detectMalay(msg.message) ? '[lang=Malay]' : '[lang=EN]';
            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SENT TO GEMINI ${langTag}`);

            const result = await analyseWithGemini(msg.message);

            if (result._error) {
                logWarn(`[Scraper] Gemini failed for ${channelId} msg ${msg.id}, will retry next cycle`);
                // Do NOT mark as seen — allow a retry on next cycle
                continue;
            }

            // Mark as seen BEFORE posting (prevents retry on Discord failure)
            await markAsSeen(msg.id, channelId, contentHash, simhash);

            if (!result.isEvent) {
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says NOT_EVENT`);
                continue;
            }

            // Guard: skip if Gemini failed to extract a real title
            if (!result.title || result.title.trim().length === 0 || result.title === 'Event Announcement') {
                logWarn(`[Scraper] ${channelId} msg ${msg.id}: SKIPPED (missing/generic title)`);
                continue;
            }

            // ── Gate 5: Past event guard ────────────────────────────────────
            if (isEventPast(result)) {
                skippedPast++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (event is in the past)`);
                continue;
            }

            // ── Gate 6: Title-level dedup (cross-channel same event) ────────
            const titleHash = normaliseTitleHash(result.title);
            if (await isTitleDuplicate(titleHash)) {
                skippedTitleDupe++;
                logInfo(`[DEBUG] ${channelId} msg ${msg.id}: SKIPPED (title duplicate — same event already posted)`);
                continue;
            }

            logInfo(`[DEBUG] ${channelId} msg ${msg.id}: GEMINI says EVENT (${result.type}) ${langTag} title="${result.title}"`);
            eventsFound++;
            await postToDiscord(discordChannel, result, channelName || channelId, msg.message, titleHash);
            logInfo(`[Scraper] Posted: ${result.title} [${result.type}]`);
        }

        logInfo(
            `[DEBUG] ${channelId} SUMMARY: total=${total} short=${skippedShort} ` +
            `seen=${skippedSeen} exact_dupe=${skippedDupe} near_dupe=${skippedNearDupe} ` +
            `past=${skippedPast} blacklist=${skippedBlacklisted} title_dupe=${skippedTitleDupe} ` +
            `gemini=${sentToGemini} events=${eventsFound}`
        );

        return { eventsFound, sentToGemini };
    } catch (err) {
        logError(`[Scraper] Error scraping ${channelId}: ${err.message}`);
        return { eventsFound: 0, sentToGemini: 0 };
    }
}

// ─── Auto-close Past Event Threads ───────────────────────────────────────────

/**
 * Locks and archives Discord forum threads for events whose end date has passed.
 * Also prunes seen_messages entries older than 30 days (DB size TTL).
 */
async function autoClosePastEvents(discordClient) {
    logInfo('[AutoClose] Running auto-close checks and seen messages cleanup...');

    // TTL cleanup — prune seen messages older than 30 days
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    db.run('DELETE FROM seen_messages WHERE posted_at < ?', [thirtyDaysAgo], (err) => {
        if (err) logError(`[AutoClose] Seen messages cleanup error: ${err.message}`);
        else     logInfo('[AutoClose] Successfully pruned old seen messages.');
    });

    return new Promise((resolve, reject) => {
        db.all(
            'SELECT thread_id, title, event_end_date FROM telegram_events WHERE (closed = 0 OR closed IS NULL) AND event_end_date IS NOT NULL',
            [],
            async (err, rows) => {
                if (err) {
                    logError(`[AutoClose] Database error: ${err.message}`);
                    return reject(err);
                }

                if (!rows || rows.length === 0) {
                    logInfo('[AutoClose] No open events to check.');
                    return resolve(0);
                }

                const now      = new Date();
                const todayISO = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

                let closedCount = 0;
                for (const row of rows) {
                    if (row.event_end_date < todayISO) {
                        try {
                            let thread = await discordClient.channels.fetch(row.thread_id).catch(err => {
                                // 10003 = Unknown Channel (deleted) — safe to mark closed
                                if (err && err.code === 10003) return null;
                                throw err;
                            });

                            if (thread) {
                                await thread.send('🔒 **This event has ended.** The thread is now locked and archived.').catch(() => {});
                                await thread.edit({ locked: true, archived: true, reason: 'Event has ended' }).catch(() => {});
                                logInfo(`[AutoClose] Locked and archived thread ${row.thread_id} ("${row.title}")`);
                            } else {
                                logInfo(`[AutoClose] Thread ${row.thread_id} missing from Discord — marking closed in DB.`);
                            }

                            await new Promise((resDb, rejDb) => {
                                db.run('UPDATE telegram_events SET closed = 1 WHERE thread_id = ?', [row.thread_id], (errDb) => {
                                    if (errDb) rejDb(errDb);
                                    else       resDb();
                                });
                            });
                            closedCount++;
                        } catch (threadErr) {
                            logError(`[AutoClose] Failed to close thread ${row.thread_id}: ${threadErr.message}`);
                        }
                    }
                }

                logInfo(`[AutoClose] Closed ${closedCount} past event thread(s).`);
                resolve(closedCount);
            }
        );
    });
}

// ─── Top-level Scrape Cycle ───────────────────────────────────────────────────

/**
 * Runs a full scrape cycle across all configured Telegram channels.
 * Exported so the Discord /scrape command can invoke it manually.
 *
 * @param {import('discord.js').Client} discordClient
 * @param {object}  [options]
 * @param {boolean} [options.force]           - Skip dedup checks (re-processes all messages)
 * @param {string}  [options.targetChannelId] - Scrape only this channel
 */
async function runScrape(discordClient, options = {}) {
    if (state.isScraping) {
        logWarn('[Scraper] Scrape already in progress, skipping.');
        return { skipped: true };
    }

    state.isScraping = true;
    logInfo('[Scraper] Starting scrape cycle...');

    // Resolve Discord event channel (cache-first)
    const targetDiscordChannelId = config.discordEventForumId || '1519270170873565405';
    let discordChannel = discordClient.channels.cache.get(targetDiscordChannelId);
    if (!discordChannel) {
        discordChannel = await discordClient.channels.fetch(targetDiscordChannelId).catch(() => null);
    }
    if (!discordChannel) {
        state.isScraping = false;
        logError('[Scraper] Discord event channel not found. Aborting scrape cycle.');
        return { error: 'Discord event channel not found.' };
    }

    // Fetch keyword blacklist
    let blacklist = [];
    try {
        blacklist = await getKeywordBlacklist();
    } catch (err) {
        logError(`[Scraper] Error fetching blacklist: ${err.message}`);
    }

    // Resolve channels to scrape
    let channelsToScrape = await getChannelDetails();
    if (options.targetChannelId) {
        channelsToScrape = channelsToScrape.filter(ch => ch.channel_id === options.targetChannelId);
    }

    let totalEvents = 0, totalGemini = 0;

    for (const ch of channelsToScrape) {
        const { eventsFound, sentToGemini } = await scrapeChannel(
            discordChannel,
            ch.channel_id,
            options.force,
            ch.channel_name,
            blacklist
        );
        totalEvents += eventsFound;
        totalGemini += sentToGemini;
    }

    state.isScraping = false;
    logInfo('[Scraper] Scrape cycle complete.');

    return { channelsScraped: channelsToScrape.length, totalEvents, totalGemini };
}

module.exports = { runScrape, autoClosePastEvents };

```

# src\telegram\TelegramListener.js

```js
const { TelegramClient } = require('telegram');
const { StringSession }  = require('telegram/sessions');
const cron               = require('node-cron');
const config             = require('../../config/config.json');

const state              = require('../shared/state');
const { logInfo, logWarn, logError } = require('./logger');
const { runScrape, autoClosePastEvents } = require('./Scraper');

// Holds the cron task so /scrape stop can cancel it
let scrapeCronTask = null;

// ─── Entry Point ──────────────────────────────────────────────────────────────

async function start(discordClient) {
    state.discordClient = discordClient; // Make the Discord client available to the live logger

    if (!config.telegramApiId || !config.telegramApiHash) {
        return logWarn('[TelegramListener] Telegram API credentials not set. Skipping.');
    }

    const session        = new StringSession(config.telegramSession || '');
    const telegramClient = new TelegramClient(session, config.telegramApiId, config.telegramApiHash, {
        connectionRetries: 5,
    });

    await telegramClient.start({
        phoneNumber: async () => config.telegramPhone,
        password:    async () => config.telegramPassword || '',
        phoneCode:   async () => {
            logInfo('[TelegramListener] Enter the Telegram login code:');
            return new Promise(resolve => process.stdin.once('data', d => resolve(d.toString().trim())));
        },
        onError: (err) => logError(`[TelegramListener] Auth error: ${err}`),
    });

    // Store the connected client in shared state so Scraper (and any command
    // handlers) can access it without circular imports.
    state.telegramClient = telegramClient;

    logInfo('[TelegramListener] Connected to Telegram!');
    logInfo('[TelegramListener] Save this session string to config.telegramSession:\n' + telegramClient.session.save());

    // ── Auto-close schedule (still runs automatically) ──────────────────────
    cron.schedule('0 0 * * *', () => autoClosePastEvents(discordClient));
    autoClosePastEvents(discordClient).catch(err =>
        logError(`[AutoClose] Error on startup: ${err.message}`)
    );

    logInfo('[TelegramListener] Ready. Use /scrape to start a scrape cycle.');
}

/**
 * Starts the periodic cron scrape schedule.
 * Called by /scrape start (or /scrape with no action).
 */
function startScrapeCron(discordClient) {
    if (scrapeCronTask) {
        logWarn('[TelegramListener] Scrape cron is already running.');
        return false;
    }
    const intervalHours = config.telegramScrapeIntervalHours || 6;
    const cronExpr      = `0 */${intervalHours} * * *`;
    scrapeCronTask = cron.schedule(cronExpr, () => runScrape(discordClient));
    logInfo(`[TelegramListener] Scrape cron started — running every ${intervalHours} hours.`);
    return true;
}

/**
 * Stops the periodic cron scrape schedule.
 * Called by /scrape stop.
 */
function stopScrapeCron() {
    if (!scrapeCronTask) {
        logWarn('[TelegramListener] No scrape cron is currently running.');
        return false;
    }
    scrapeCronTask.stop();
    scrapeCronTask = null;
    logInfo('[TelegramListener] Scrape cron stopped.');
    return true;
}

/** Returns true if the periodic cron is currently active. */
function isScrapeCronActive() {
    return scrapeCronTask !== null;
}

module.exports = { start, runScrape, startScrapeCron, stopScrapeCron, isScrapeCronActive };

```

# src\UserTimeout.js

```js
module.exports = class UserTimeout {
    constructor() {
        this.timestamp = Date.now()
        this.waitseconds = 0
    }

    increaseWaitTime() {
        if (this.waitseconds < 300) {
            this.waitseconds *= 5
        }
        if (this.waitseconds === 0) {
            this.waitseconds = 12
        }
    }

    resetWaitTime() {
        this.waitseconds = 0
    }
}
```

# src\utils\embeds.js

```js
const { EmbedBuilder } = require('discord.js');
const { getLocale } = require('../Language');

/**
 * Creates a "Session Expired" embed for when user is not linked to a guild
 * @param {boolean} includeEmailStep - Whether to include step 3 about entering email
 * @returns {EmbedBuilder}
 */
function createSessionExpiredEmbed(includeEmailStep = true) {
    let description = 'Your verification session has expired or was not started properly.\n\n**How to fix:**\n1. Go back to the server\'s verification channel\n2. Click the verification button to start fresh';
    if (includeEmailStep) {
        description += '\n3. Enter your email to receive a new code';
    }
    
    return new EmbedBuilder()
        .setTitle('❌ Session Expired')
        .setDescription(description)
        .setColor(0xED4245);
}

/**
 * Creates an "Invalid Code" embed
 * @param {string} language - Language code for localization
 * @returns {EmbedBuilder}
 */
function createInvalidCodeEmbed(language) {
    return new EmbedBuilder()
        .setTitle(getLocale(language, 'invalidCodeTitle'))
        .setDescription(getLocale(language, 'invalidCodeDescription'))
        .setColor(0xED4245);
}

/**
 * Creates an "Invalid Email" embed
 * @param {string} language - Language code for localization
 * @returns {EmbedBuilder}
 */
function createInvalidEmailEmbed(language) {
    return new EmbedBuilder()
        .setTitle(getLocale(language, 'mailInvalidTitle'))
        .setDescription(getLocale(language, 'mailInvalidDescription'))
        .setColor(0xED4245);
}

/**
 * Creates a "Verification Success" embed
 * @param {string} language - Language code for localization
 * @param {string|string[]} roleNames - Name(s) of the verified role(s)
 * @param {string} serverName - Name of the server
 * @param {string} serverIconURL - URL of the server icon
 * @returns {EmbedBuilder}
 */
function createVerificationSuccessEmbed(language, roleNames, serverName, serverIconURL) {
    // Handle both single role name (legacy) and array of role names
    const roleList = Array.isArray(roleNames) ? roleNames : [roleNames]
    const rolesText = roleList.length > 0 ? roleList.join(', ') : 'Verified'
    
    return new EmbedBuilder()
        .setTitle(getLocale(language, 'verificationSuccessTitle'))
        .setDescription(getLocale(language, 'verificationSuccessDescription', rolesText, serverName))
        .setColor(0x57F287)
        .setThumbnail(serverIconURL);
}

/**
 * Creates a "Code Sent" embed
 * @param {string} language - Language code for localization
 * @param {string} email - Email address the code was sent to
 * @returns {EmbedBuilder}
 */
function createCodeSentEmbed(language, email) {
    return new EmbedBuilder()
        .setTitle(getLocale(language, 'codePromptTitle'))
        .setDescription(getLocale(language, 'codePromptDescription', email))
        .setColor(0x57F287)
        .addFields({
            name: getLocale(language, 'codePromptTip'),
            value: getLocale(language, 'codePromptTipValue')
        });
}

/**
 * Creates a verification log embed for the log channel
 * @param {Object} options - Options for the embed
 * @param {Object} options.user - The Discord user who was verified
 * @param {string} options.email - The email address used for verification
 * @param {string} options.type - Type of verification: 'email' or 'manual'
 * @param {Object} [options.admin] - The admin who performed manual verification (for manual type)
 * @param {Object} [options.role] - The verified role that was assigned
 * @returns {EmbedBuilder}
 */
function createVerificationLogEmbed({ user, email, type, admin, role }) {
    const isManual = type === 'manual';
    
    const embed = new EmbedBuilder()
        .setAuthor({
            name: user.tag || user.username,
            iconURL: user.displayAvatarURL({ dynamic: true })
        })
        .setColor(isManual ? 0xFFA500 : 0x57F287)
        .setTimestamp();

    if (isManual) {
        embed.setTitle('🔧 Manual Verification');
        embed.setDescription(`<@${user.id}> was manually verified by an administrator.`);
        embed.addFields(
            { name: '👤 User', value: `<@${user.id}>\n\`${user.id}\``, inline: true },
            { name: '📧 Email', value: `\`${email}\``, inline: true },
            { name: '👮 Verified By', value: admin ? `<@${admin.id}>` : 'Unknown', inline: true }
        );
    } else {
        embed.setTitle('✅ Email Verification');
        embed.setDescription(`<@${user.id}> has successfully verified their email.`);
        embed.addFields(
            { name: '👤 User', value: `<@${user.id}>\n\`${user.id}\``, inline: true },
            { name: '📧 Email', value: `\`${email}\``, inline: true }
        );
    }

    if (role) {
        embed.addFields({ name: '🎭 Role Assigned', value: `<@&${role.id}>`, inline: true });
    }

    embed.setFooter({ 
        text: isManual ? 'Manual verification' : 'Email verification'
    });

    return embed;
}

/**
 * Creates a verification failed log embed for the log channel
 * @param {Object} options - Options for the embed
 * @param {Object} options.user - The Discord user who failed verification
 * @param {string} options.email - The email address attempted
 * @param {string} options.reason - Reason for failure
 * @returns {EmbedBuilder}
 */
function createVerificationFailedLogEmbed({ user, email, reason }) {
    return new EmbedBuilder()
        .setTitle('❌ Verification Failed')
        .setAuthor({
            name: user.tag || user.username,
            iconURL: user.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`<@${user.id}> failed to verify.`)
        .addFields(
            { name: '👤 User', value: `<@${user.id}>\n\`${user.id}\``, inline: true },
            { name: '📧 Email Attempted', value: email ? `\`${email}\`` : 'N/A', inline: true },
            { name: '❓ Reason', value: reason, inline: false }
        )
        .setColor(0xED4245)
        .setTimestamp()
        .setFooter({ text: 'Verification attempt failed' });
}

module.exports = {
    createSessionExpiredEmbed,
    createInvalidCodeEmbed,
    createInvalidEmailEmbed,
    createVerificationSuccessEmbed,
    createCodeSentEmbed,
    createVerificationLogEmbed,
    createVerificationFailedLogEmbed
};

```

# src\utils\ErrorNotifier.js

```js
const { EmbedBuilder } = require('discord.js');
const { getLocale } = require('../Language');
const database = require('../database/Database');

/**
 * Centralized error notification system for the bot
 * Sends error messages to configured destination (owner, user, or channel)
 * Falls back to guild owner if configured destination fails
 */
class ErrorNotifier {
    /**
     * Send an error notification to the appropriate destination
     * @param {Object} options - Error notification options
     * @param {Guild} options.guild - The Discord guild where the error occurred
     * @param {string} options.errorTitle - Short title for the error
     * @param {string} options.errorMessage - Detailed error message for admins
     * @param {User} [options.user] - The user who triggered the error (optional)
     * @param {Interaction} [options.interaction] - The interaction to reply to with generic message (optional)
     * @param {string} [options.language] - Language code for localization (optional)
     * @returns {Promise<boolean>} - Whether the notification was sent successfully
     */
    static async notify({ guild, errorTitle, errorMessage, user = null, interaction = null, language = 'english' }) {
        if (!guild) {
            console.error('[ErrorNotifier] No guild provided for error notification');
            return false;
        }

        // Send generic error message to user if interaction provided
        if (interaction) {
            await this.sendGenericUserError(interaction, language);
        }

        // Get server settings to determine where to send error
        return new Promise((resolve) => {
            database.getServerSettings(guild.id, async (serverSettings) => {
                const lang = serverSettings.language || language;
                const notifyType = serverSettings.errorNotifyType || 'owner';
                const notifyTarget = serverSettings.errorNotifyTarget || '';

                const errorEmbed = this.createAdminErrorEmbed(guild, errorTitle, errorMessage, user, lang);

                let sent = false;
                let fallbackReason = null;

                // Try to send to configured destination
                if (notifyType === 'channel' && notifyTarget) {
                    sent = await this.sendToChannel(guild, notifyTarget, errorEmbed);
                    if (!sent) {
                        fallbackReason = getLocale(lang, 'errorNotifyChannelFailed');
                    }
                } else if (notifyType === 'user' && notifyTarget) {
                    sent = await this.sendToUser(guild, notifyTarget, errorEmbed);
                    if (!sent) {
                        fallbackReason = getLocale(lang, 'errorNotifyUserFailed');
                    }
                }

                // If not sent yet (either owner type or fallback), send to owner
                if (!sent) {
                    const ownerSent = await this.sendToOwner(guild, errorEmbed, fallbackReason, lang);
                    resolve(ownerSent);
                } else {
                    resolve(true);
                }
            });
        });
    }

    /**
     * Send generic error message to the user
     */
    static async sendGenericUserError(interaction, language) {
        const embed = new EmbedBuilder()
            .setTitle(getLocale(language, 'errorGenericTitle'))
            .setDescription(getLocale(language, 'errorGenericDescription'))
            .setColor(0xED4245)
            .setTimestamp();

        try {
            if (interaction.deferred || interaction.replied) {
                await interaction.followUp({ embeds: [embed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } catch (e) {
            // Can't send to user, that's fine
        }
    }

    /**
     * Create the detailed error embed for admins
     */
    static createAdminErrorEmbed(guild, errorTitle, errorMessage, user, language) {
        const embed = new EmbedBuilder()
            .setTitle(`⚠️ ${errorTitle}`)
            .setDescription(errorMessage)
            .setColor(0xFFA500)
            .addFields(
                { name: getLocale(language, 'errorFieldGuild'), value: `${guild.name} (${guild.id})`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'EmailBot Error Notification' });

        if (user) {
            embed.addFields(
                { name: getLocale(language, 'errorFieldUser'), value: `${user.tag || user.username} (<@${user.id}>)`, inline: true }
            );
        }

        return embed;
    }

    /**
     * Send error to a specific channel
     */
    static async sendToChannel(guild, channelId, embed) {
        try {
            const channel = guild.channels.cache.get(channelId);
            if (!channel) {
                return false;
            }
            await channel.send({ embeds: [embed] });
            return true;
        } catch (e) {
            console.error(`[ErrorNotifier] Failed to send to channel ${channelId}:`, e.message);
            return false;
        }
    }

    /**
     * Send error to a specific user via DM
     */
    static async sendToUser(guild, userId, embed) {
        try {
            const member = await guild.members.fetch(userId).catch(() => null);
            if (!member) {
                return false;
            }
            await member.send({ embeds: [embed] });
            return true;
        } catch (e) {
            console.error(`[ErrorNotifier] Failed to send to user ${userId}:`, e.message);
            return false;
        }
    }

    /**
     * Send error to guild owner via DM
     * @param {Guild} guild - The Discord guild
     * @param {EmbedBuilder} embed - The error embed
     * @param {string|null} fallbackReason - Reason why fallback was triggered (if any)
     * @param {string} language - Language code
     */
    static async sendToOwner(guild, embed, fallbackReason, language) {
        try {
            const owner = await guild.fetchOwner();
            if (!owner) {
                console.error(`[ErrorNotifier] Could not fetch owner for guild ${guild.id}`);
                return false;
            }

            // If this is a fallback, add warning about the failed notification method
            if (fallbackReason) {
                embed.addFields({
                    name: getLocale(language, 'errorFallbackWarning'),
                    value: fallbackReason,
                    inline: false
                });
            }

            await owner.send({ embeds: [embed] });
            return true;
        } catch (e) {
            console.error(`[ErrorNotifier] Failed to send to owner of guild ${guild.id}:`, e.message);
            return false;
        }
    }
}

module.exports = ErrorNotifier;


```

# src\utils\wildcardMatch.js

```js
/**
 * Escape a string for use in a regular expression
 * Uses RegExp.escape() if available (Node.js 23+), otherwise provides a polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape
 * @param {string} str - The string to escape
 * @returns {string} The escaped string safe for use in RegExp
 */
function escapeRegExp(str) {
    if (typeof RegExp.escape === 'function') {
        return RegExp.escape(str);
    }
    // Polyfill: escape all regex special characters
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert a wildcard pattern to a RegExp
 * Supports * as a wildcard that matches any characters
 * @param {string} pattern - The pattern with optional * wildcards
 * @param {Object} options - Options for the regex
 * @param {boolean} options.fullMatch - If true, pattern must match entire string (default: false)
 * @param {boolean} options.caseInsensitive - If true, match is case-insensitive (default: true)
 * @returns {RegExp} The compiled regular expression
 */
function wildcardToRegex(pattern, options = {}) {
    const { fullMatch = false, caseInsensitive = true } = options;
    
    // Split by * to get literal parts
    const parts = pattern.split('*');
    
    // Escape each part and join with .* (match any characters)
    const regexPattern = parts.map(part => escapeRegExp(part)).join('.*');
    
    // Build final pattern
    const finalPattern = fullMatch ? `^${regexPattern}$` : regexPattern;
    const flags = caseInsensitive ? 'i' : '';
    
    return new RegExp(finalPattern, flags);
}

/**
 * Check if a string matches a wildcard pattern
 * @param {string} str - The string to test
 * @param {string} pattern - The pattern with optional * wildcards
 * @param {Object} options - Options passed to wildcardToRegex
 * @returns {boolean} True if the string matches the pattern
 */
function matchesWildcard(str, pattern, options = {}) {
    const regex = wildcardToRegex(pattern, options);
    return regex.test(str);
}

/**
 * Check if a string matches any of the given wildcard patterns
 * @param {string} str - The string to test
 * @param {string[]} patterns - Array of patterns with optional * wildcards
 * @param {Object} options - Options passed to wildcardToRegex
 * @returns {boolean} True if the string matches any pattern
 */
function matchesAnyWildcard(str, patterns, options = {}) {
    return patterns.some(pattern => matchesWildcard(str, pattern, options));
}

/**
 * Check if an email matches any of the allowed domain patterns
 * Domain patterns can include * wildcards (e.g., @*.edu, @*.harvard.edu)
 * @param {string} email - The email address to check
 * @param {string[]} domainPatterns - Array of domain patterns (e.g., @gmail.com, @*.edu)
 * @returns {boolean} True if the email matches any domain pattern
 */
function emailMatchesDomains(email, domainPatterns) {
    email = email.toLowerCase();
    
    for (const pattern of domainPatterns) {
        // Domain patterns should match at the end of the email
        const regex = wildcardToRegex(pattern, { fullMatch: false, caseInsensitive: true });
        
        // Ensure it matches at the end (domain part)
        const endPattern = new RegExp(regex.source + '$', regex.flags);
        if (endPattern.test(email)) {
            return true;
        }
    }
    return false;
}

/**
 * Check if an email is blacklisted
 * Blacklist patterns can include * wildcards and match anywhere in the email
 * @param {string} email - The email address to check
 * @param {string[]} blacklistPatterns - Array of blacklist patterns
 * @returns {boolean} True if the email is blacklisted
 */
function emailIsBlacklisted(email, blacklistPatterns) {
    email = email.toLowerCase();
    
    for (const pattern of blacklistPatterns) {
        // Blacklist patterns match anywhere in the email (contains match)
        if (matchesWildcard(email, pattern, { fullMatch: false, caseInsensitive: true })) {
            return true;
        }
    }
    return false;
}

/**
 * Get all domain patterns that match an email address
 * Returns all matching patterns (not just the first or most specific)
 * @param {string} email - The email address to check
 * @param {string[]} domainPatterns - Array of domain patterns (e.g., @gmail.com, @*.edu)
 * @returns {string[]} Array of all matching domain patterns
 */
function getMatchingDomainPatterns(email, domainPatterns) {
    email = email.toLowerCase();
    const matches = [];
    
    for (const pattern of domainPatterns) {
        // Domain patterns should match at the end of the email
        const regex = wildcardToRegex(pattern, { fullMatch: false, caseInsensitive: true });
        
        // Ensure it matches at the end (domain part)
        const endPattern = new RegExp(regex.source + '$', regex.flags);
        if (endPattern.test(email)) {
            matches.push(pattern);
        }
    }
    return matches;
}

module.exports = {
    escapeRegExp,
    wildcardToRegex,
    matchesWildcard,
    matchesAnyWildcard,
    emailMatchesDomains,
    emailIsBlacklisted,
    getMatchingDomainPatterns
};

```

