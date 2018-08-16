<template>
    <div>
        <Header></Header>
        <div class="main" @click="initPop">
            <BreadCrumbs :data="[{ name: _('Home'), path: '/' }, { name: _('Privacy Policy'), path: '/policy' }]"></BreadCrumbs>
            <div id="main-policy" class="main-policy">
                <h1>
                    Terms and Conditions
                </h1>
                <h2>
                    General
                </h2>
                <p>
                    These Terms and Conditions (“T&Cs” or “Agreement”) constitute and govern the contractual relationship between the parties and are effective as of May, 2018. All applications provided by Coinsprize platform and the platform (https://coinsprize.com) hereinafter referred to as “The Platform”, “Coinsprize” or “We”, “Us”; or “Our”; a single application uses the application name; and You, as the user and customer, hereinafter referred to as “User” or “You” or “Yours”; “Coinsprize Service Agreement” hereinafter referred to as the "The Agreement“.
                </p>
                <p>
                    The User must read, agree with and accept all of the Terms and Conditions contained in this Agreement without modifications, which include those Terms and Conditions expressly set forth below and those incorporated by reference, before the User may become an active, registered User of Coinsprize. By continuing to access or use the Website, the User agrees to follow the Terms and Conditions of this Agreement. This Agreement shall also apply to all Services provided via mobile devices, including downloadable applications. All references to the use of the Website shall be construed as references to the use of our Services provided for mobile devices.
                </p>
                <p>
                    Coinsprize may amend and/or assign this Agreement or any rights and/or obligations from time to time. The Terms and Conditions and the Privacy Policy are published on the Website and may be changed at any time. The new version of these Terms and Conditions will take effect immediately upon the next visit or login on the Website. By continuing to use the Website, the Services or the software offered by Coinsprize, the User agrees to be bound by the T&Cs as well as by the latest modifications to it. If the User does not agree to be bound by the changes to these T&C's, the User must not use or access Our Services, and inform Us in writing immediately. In order to avoid misunderstandings and disputes at a later stage, Users can print out these T&C's.
                </p>
                <p>
                    Coinsprize may publish these Terms and Conditions in a number of languages and shall reflect the same principles. This is done for information purposes and to help players. It is however the English version that constitutes the legal basis of the relationship between You and Coinsprize. Should there be any discrepancy between the T&Cs in the English version and the version in any other language, the English version shall prevail.
                </p>
                <p>
                    Coinsprize reserves the right to refuse and/or cancel Services at its own discretion where the Services are illegal to use.
                </p>
                <h2>
                    1.	Scope of the Agreement
                </h2>
                <p>
                    Products on the Platform are gaming products. Thus, the Platform only accepts Users from countries and geographic regions where online gambling is allowed by law. And Users who regard the Platform as a tool of financial management or other investment businesses are not accepted. The Platform is excluded from any liability regarding User’s loss of money.
                </p>
                <p>
                    It is the User’s sole responsibility to inquire about the existing gambling laws and regulations of the given jurisdiction before placing bets on the website. The User guarantees at all times that he/she is not the resident of countries including the United States and its dependencies, and territories including but not limited to American Samoa, Guam, Marshall Islands, North Mariana Islands, Puerto Rico, and the Virgin Islands, Cuba, Iran, China, Hong Kong, Macau, Sudan, North Korea, United Kingdom or Syria, France or Spain.
                </p>
                <p>
                    The User assures the Platform that he/she is over 18 years of age（or at least reach the minimum age for adults in the country). No person under the age of 18 or who do not meet the minimum age of the adult in their country can be registered as a User and any funds deposited or any money won by any such person shall be void. We are entitled to require User to provide proof of age and to refuse a User's access to the Service if we have reasons to believe that the minimum age requirement is not fulfilled.
                </p>
                <p>
                    The Platform is a blockchain application product. Thus, most applications are based on blockchain technology. Before using the Platform, please make sure that the blockchain is not prohibited by local laws.
                </p>
                <p>
                    The User is solely responsible for paying applicable taxes on winnings where local laws require. For matters not covered by this Agreement, you must comply with the announcements and relevant rules that are updated from time to time.
                </p>
                <h2>
                    2. Account
                </h2>
                <h3>
                    2.1 Use of Account
                </h3>
                <p>
                    You can log in to the Platform and use all application services provided on the Platform (self-excluded, sanctioned for violation and invalid accounts are not qualified for part or all of services).
                </p>
                <h2>
                    2.2 Account Modification
                </h2>
                <p>
                    To protect rights of Users and ensure the uniqueness of accounts, Users cannot modify part of the account information on their own;
                </p>
                <p>
                    If it is User's own operation causing the account information to be changed without timely modification or saving, resulting in the inability to prove the User's effective identity, Coinsprize operator reserves the right to decline providing any information or assuming any obligations.
                </p>
                <h3>
                    2.3 Account Protection
                </h3>
                <p>
                    Users should keep their own accounts and passwords properly, and take full responsibility for the security of their own accounts and passwords.
                    If any illegal use of the account or account theft is found by the User, he/she should inform Coinsprize operator immediately;
                </p>
                <p>
                    If the Coinsprize operator suspects an account being theft, we reserve the right to terminate the account immediately. The User must prove that the account belongs to him/her before recover the account which was suspended because suspected of being stolen.
                </p>
                <p>
                    The account on Platform corresponds to the account on blockchain. If the account or password is illegally used by another person due to the User's own reasons, the Coinsprize operator will not be liable for undertaking and dealing the issue. The User's own reasons include but not limited to: disclosing account and password and login information to a third party; sharing the same account with other persons; installing illegal or unsolicited programs; attempting malicious attacks to obtain the private key of the blockchain account, keystore and other information; User’s misuse of funds to transfer the digital currency in the account to a wrong address.
                </p>
                <p>
                    If the Platform account is found with abnormal operations, funds in the account may be preferentially transferred to a securities account. The User may then attempt to recover funds in the account with a valid credential.
                </p>
                <p>
                    Unless Users use Our services via the Platform, otherwise the Platform is not liable for any problems Users meet via the third party Platform login.
                </p>
                <h3>
                    2.4 Deposit and Transfer
                </h3>
                <p>
                    User can use the account to deposit and transfer on the Platform (i.e., to transfer money from game account to a personal blockchain account). The specific deposit and transfer activities proceed in corresponding blockchain system rather than Coinsprize. Since data on blockchain are featured with irrevocability, we are not able to suspend or cancel your ongoing deposit or transfer activities.
                    Meanwhile, the following conditions may lead to "transaction failure" or "request timeout":
                </p>
                <div>
                    <p>a)  Insufficient balance;</p>
                    <p>b) Insufficient trading miner fees;</p>
                    <p>c) Blockchain fails to execute the contract code;</p>
                    <p>d) Exceed the maximum trading amount specified by the regulatory authorities, Coinsprize, or laws and regulations;</p>
                    <p>e) The occurrence of technical failures (network, equipment and so forth);</p>
                    <p>f) Blockchain congestion, failures and other reasons that may terminate transactions;</p>
                    <p>g) Your address or your counterpart’s is identified as an abnormal address, such as high-risky address, exchange address, ICO address, Token address and so forth.</p>
                </div>
                <h3>
                    2.5 Rules for Account Data
                </h3>
                <p>
                    For the account data on the platform provided by the User, he/she reserves the following rights:
                </p>
                <div>
                    <p>a) Right to Know: The Platform must open the details of use, and provide Users free check access. All checking records will be recorded on the Platform.</p>
                    <p>b) Access Right: Users can check specific information at any time whether the data has been modified or not.</p>
                    <p>c) Right to Rectify: User reserves the right to modify the wrong data, if the modification is not adopted, the User has right to complain or require judicial remedy, and the Platform will respond to the User’s request in time.</p>
                    <p>d) Right to Delete: When date on the Platform provided by User involves: data no longer needed, data required by the Platform but unclear about the purpose, data illegally used by others, and data related to the minor, User reserves the right to request the deletion of the data. The platform will actively cooperate with the issue</p>
                   <p>e) Right of Objection: User reserves the right to object to personal data being used for marketing</p>
                    <p>f) Automated individual decision-making and analysis: the User can agree that his/her personal data could be analyzed.</p>

                </div>
                <p>
                    Coinsprize guarantees to completely keep Users’ information confidential except when:
                </p>
                <div>
                    <p>a) It is required by government offices or judicial authorities;   </p>
                    <p>b) It is required by the current laws and regulations, including but not limited to providing identity proof before using the Platform in some regions;   </p>
                    <p>c) Coinsprize reserves the right to suspect that the User might have threatened their national security or with other illegal behaviors. In this case, the Coinsprize operator will provide relevant information to law enforcement agencies for investigation.   </p>
                </div>
               <h3>
                   2.6 Account Sanction and Suspension
               </h3>
                <p>
                    If the User violates any of the following regulations, We will evaluate the consequential influence. The Platform reserves the right to restrict part or all of account services, or suspend the account;
                </p>
                <div>
                    <p>a) The User provides incorrect or misleading information on his/her account or upon registration, including but not limited to stealing others’ email addresses. </p>
                    <p>b) The User is an individual under 18 years of age, or under legal age of majority in jurisdiction of where the User resides. </p>
                    <p>c) The User is under legal supervision or restricted in his/her business activities. </p>
                    <p>d) The User uses the account for commercial purposes. </p>
                    <p>e) The User has no knowledge about any results before placing a bet. </p>
                    <p>f) The User has not read these Terms and Conditions, or has not fully understood the Agreement. </p>
                    <p>g) The User's registered name contains offensive or indecent information, or words that are considered to be a violation of local laws; </p>
                </div>
                <p>
                    If the User violates any of the following regulations or any terms of the Agreement, the Platform reserves the right to stop all services of the account, including but not limited to stopping, suspending account services, freezing account funds and closing accounts;
                </p>
                <div>
                    <p>a) Coinsprize allows only one account per person. The use of multiple accounts per physical User is strictly forbidden. Coinsprize reserves the right to suspect that the User has registered multiple accounts according to account activity. </p>
                    <p>b) Create and use an account by stealing information from others or against the will of others. </p>
                    <p>c) Use the Platform or services for massive commercial intentions, or cause damage to other Users. </p>
                    <p>d) The Platform account itself does not have any substantial value, any kinds of account selling, pledging, obtaining or transferring to other Users are prohibited by the Platform. </p>
                    <p>e) For Users’ own reasons, Users are prohibited by their local laws from using this sort of product or Our Platform if it is explicitly restricted. </p>
                    <p>f) Making profits from bugs or flaws of blockchain technology that may exist in the Platform. </p>
                    <p>g) Fraud, money laundering and anything forbidden by local laws or a broader applicable law. The fraudulent acts include:
                        <span>1) Participating in any type of collusion with other users; </span>
                        <span>2) Developing strategies against bonuses from unfair access; </span>
                        <span>3) Fraudulent acts against other blockchain games or payment providers on the Platform; </span>
                        <span>4) Using the platform for money laundering; </span>
                        <span>5) Other types of cheating; </span>
                        <span>6) Being a bankrupt in the resident country. </span>
                    </p>
                </div>
                <p>
                    The account dormancy lasts for more than 1 year and no activity has been performed after receiving 3 or more times of reminder. In this case, all account service will be ceased by the Platform. Users can provide relevant documents to apply for service recovery.
                </p>
                <h2>
                    3. Coinsprize Platform
                </h2>
                    <h4>
                        3.1 Services on Coinsprize Platform
                    </h4>
                    <p>
                        Services on Coinsprize Platform refer to all applications offered by Coinsprize Platform, Lucky11, LuckyCoin and other services on Platform. Most services on Platform are utterly based on the Ethernet chain. Thus, the Platform does not assume any responsibility if the services are delayed, interrupted or failed because of the network error of Ethernet chain or relevant technical problems.
                    </p>
                    <h4>
                        3.2 Coinsprize Platform Fees
                    </h4>
                    <p>
                        Except Lucky11 and LuckyCoin, any other services on Coinsprize Platform are provided for free. Since part of the services is based on Ethernet chain, it may require fees to support the service provided. Users should notice that the fee is not charged by the Platform.
                    </p>
                <h3>
                    3.3 Lucky11
                </h3>
                <h4>
                    3.3.1. Lucky11 Service
                </h4>
                <p>
                    Lucky11 is a game of chance. User wins if his/her chosen number matches the draw result. The User must know that the game result is purely based on nothing but chance, so losses may occur. The draw result is calculated from the hash value of the corresponding block on Ethereum, and Users can check the data from Ethereum.
                </p>
                <h4>
                    3.3.2 Lucky11 Game Cost
                </h4>
                <p>
                    Lucky11 game cost varies from 0.001 ETH to 0.1 ETH per draw for Users to choose, the winning prize equals the corresponding cost * multiples. If Users would like to win extra reward from prize pool, both numbers and the sequence of chosen numbers should exactly match the draw results.
                </p>
                <h4>
                    3.3.3 Special Circumstances of Lucky11
                </h4>
                <p>
                    The following special circumstances may occur in Lucky11. Please ensure you are fully aware of the following risks before playing the game:
                </p>
              <div>
                  <p>a) The draw result is entirely based on the blockchain technology. If network delay or blockage on blockchain occurs, the Platform will temporarily close the bet to avoid unfair draw result. </p>
                  <p>b) Data on blockchain may rollback. If it happens, the draw result which has already calculated will not be changed even though the corresponding block was canceled. </p>
                  <p>c) The bet takes effect only after the relevant info successfully uploaded to the Ethereum. Network congestion may lead to the failure of placing a bet. </p>
                  <p>d) The draw of prize pool is asynchronous which requires two times of hash verification. The prize pool cannot be distributed if the block was canceled. </p>
              </div>
                <h3>
                    3.4 LuckyCoin
                </h3>
                <h4>
                    3.4.1 LuckyCoin Service
                </h4>
                <p>
                    LuckyCoin is a game of chance raffle. After the User chooses to purchase 1 or more tickets, he/she will get a series of random numbers. If all chosen numbers match the draw numbers the User wins. The game is with 100% drawing rate and all draws have winners. Draw result is calculated from the hash of block on Ethernet.
                </p>
                <h4>
                    3.4.2 LuckyCoin Game Cost
                </h4>
                <p>
                    LuckyCoin has no fixed game cost, the User’s spending depends on his/her own circumstances. Theoretically, the more User costs, the higher winning chance will be.
                </p>
                <h4>
                    3.4.3 Special Circumstances of LuckyCoin
                </h4>
                <p>
                    The following special circumstances may occur in LuckyCoin. Please ensure you are fully aware of the following risks before playing the game:
                </p>
                <p>
                    The draw result is entirely based on the blockchain technology. If network delay or blockage on blockchain occurs, the Platform will temporarily close the bet to avoid unfair draw result.
                </p>
                <p>
                    Data on blockchain may rollback. If it happens, the draw result which has already calculated will not be changed even though the corresponding block was canceled.
                </p>
                <p>
                    The bet takes effect only after the relevant info successfully uploaded to the Ethereum. Network congestion may lead to the failure of placing a bet.
                </p>
                <h2>
                    4. Obligations of Users
                </h2>
                <p>
                    4.1 Unless stated in the Agreement, otherwise Users shall not perform the following behaviors (whether profitable or not) without the written consent from the Coinsprize operator:
                </p>
                <div>
                    <p>a) Copy, rip, spread or display all or part of the content of applications, manuals or other audiovisual materials on the Platform;     </p>
                    <p>b) Publicly display all or part of the content of applications on the Platform;    </p>
                    <p>c) Rent or sell the software, or use applications on the Platform to engage in profit-making activities;    </p>
                    <p>d) Modify or cover product names, company logos, trademark (or) copyright information or other statements on intellectual property rights, on the contents of applications, images, animations, packages, or manuals on the Platform;    </p>
                    <p>e) Coinsprize reserves the right to suspect that User may maliciously copy the Platform content on the blockchain, and in this case, the Platform reserves the right to take applicable measures on the account.    </p>
                </div>
                <p>
                    4.2 Users shall use the relevant services on the Platform through legal channels, and shall not perform any acts which may infringe the interests of the Coinsprize operator or third parties, disrupt the application order, violate the fairness of the application, violate the Agreement or other rules published by the Coinsprize team or relevant local laws and regulations, including but not limited to:
                </p>
                <div>
                    <p>a) Modify, translate, annotate, organize, compile, or interpret products on the Platform;  </p>
                    <p>b) reverse engineer, decompile or disassemble products on the Platform, or use other technical methods to analyze, modify, attack, or derive products on the Platform;  </p>
                    <p>c) Reverse, compile, decode or modify products on the Platform through plugins or application modification programs ("plugins" in this Agreement refers to programs which could affect the operation of the running Platform products but are independent of all products on the Platform, including but not limited to programs which could stimulate User operations, change operating environment or modify data and so forth. If there is a conflict between the definition of the relevant local laws and regulations and this Agreement, the provisions of local laws and regulations shall prevail);  </p>
                    <p>d) Log in to the Platform through abnormal or illegal channels (including but not limited to the third-party software or login system which are not developed, authorized or recognized by Coinsprize operator), use web accelerators or other plugins, or robot programs to maliciously destroy service facilities and disrupt normal service order;  </p>
                    <p>e) Use Platform products through abnormal or illegal methods (including but not limited to log in to the private server by using Coinsprize account), maliciously destroy the Platform, disrupt normal service order or have other misconducts;  </p>
                    <p>f) Develop, spread or use plugins, packets, accelerators and other kinds of cheating programs, or organize, instigate others to use such programs, or seek economic benefits for individuals or organizations by selling this sort of program;  </p>
                    <p>g) Attempt to attack the relevant servers, routers, switches or other equipment providing services on Platform to illegally obtain or modify the data unauthorized by Coinsprize, and affecting the normal order of application services on the Platform, or have any other actions with harmful intentions;  </p>
                    <p>h) Use the Platform as a carrier to develop, copy, publish and disseminate information in violation of the local laws and regulations.  </p>

                </div>
                <p>
                    Once the behaviors above of Users are detected by Coinsprize operator through internal monitoring programs or reported by other Users, the Coinsprize operator reserves the right to  make judgments and take corresponding measures at its sole discretion, including but is not limited to restricting account login and activities on the Platform, terminate the authorization of the account, freezing all balance in the account, deducting the account balance to offset users’ debts on Platform or compensate for the loss of Coinsprize team, freezing the account and requesting the compensation to Coinsprize.
                </p>
                <h2>
                    5. Interruption and Ceasing of Services
                </h2>
                <p>
                    Downtime maintenance will be implemented from time to time in order to operate the system properly. Therefore, service interruption or ceasing caused by this kind of situation should be understood by Users. The Coinsprize operator is obliged to do its best not to frequently implement maintenance, or if necessary, shorten the time for the maintenance;
                </p>
                <p>
                    The Coinsprize operator reserves the right to interrupt or cease services provided by the application server when any of the following situations occurs. The Coinsprize operator is excluded from any liability regarding the inconvenience or the loss caused by these kinds of situations for Users or any third parties:
                </p>
                <div>
                    <p>a) Periodic inspection or construction, updating of hardware and software, updating of blockchain contracts and so forth. Coinsprize operator reserves the right to suspend services and will complete the maintenance or updating as soon as possible;  </p>
                    <p>b) Server damage which may lead to operation failure;  </p>
                    <p>c) Abrupt faults of equipment of hardware, software or electronic communication;  </p>
                    <p>d) Network error or other failures caused by network provider;   </p>
                    <p>e) Safeguarding the security of the nation, Users or the third parties in the event of an emergency;  </p>
                    <p>f) Serious blockchain problems or blockage of the blockchain network (Ethernet);  </p>
                    <p>g) Force majeure or other reasons from any third party.  </p>
                </div>
                <p>
                    Except for the circumstances above, Users shall agree that the Coinsprize operator reserves the right to interrupt or terminate part or all of the network services by noticing Users through official announcements one month in advance. User shall be clear that he/she has already known the authorization of rights above and the direct or indirect loss in benefits that may be caused by implementing the rights to the User or the third parties, and User hereby shall explicitly claim that no liability of Coinsprize operator to unilaterally interrupt or cease the services for implementing rights above will be pursued.
                </p>
                <h2>
                    6. Limitation of Liability
                </h2>
                <p>
                    For Our products and services, the Coinsprize operator only makes the limited warranty described below which supersedes any other express or implied warranties (if any) in documents, packages, or other materials.
                </p>
                <p>
                    The relevant products, software, programs or any form of the support services only and is provided on an “as is” basis, and Coinsprize operator only guarantees that
                </p>
                <div>
                    <p>(1) the products and services provided by the Coinsprize operator can basically accommodate the requirements issued by Us;  </p>
                    <p>(2) the products and services provided by the Coinsprize operator can basically be in line with the warranty made by Us;  </p>
                    <p>(3) Coinsprize operator tries its best to solve the problems we meet in providing products and services to a reasonable extent that business allows. </p>
                </div>
                <p>
                    To the fullest extent permitted by applicable local law, the Coinsprize operator expressly states that any other types of warranty, whether express or implied, will not be provided, including but not limited to marketability, applicability, reliability, accuracy, completeness, and any implied warranties or liabilities with no virus and mistake.
                </p>
                <p>
                    In addition, to the fullest extent permitted by applicable local law, the Coinsprize operator does not guarantee that the products and services provided by the Coinsprize operator could completely meet the needs of Users, nor guarantee that no interruption exists during providing products and services. And the team does not warrant timeliness, safety, control of mistake, and accurate, prompt, and successful transfer of information.
                </p>
                <p>
                    To the maximum extent permitted by applicable local law, the Coinsprize operator shall not be liable for any loss, costs, expenses or damages, whether direct, indirect, special, consequential, incidental or otherwise, arising in relation to your use of the products and services provided by the Coinsprize operator, or certain requests (including but not limited to issues related to personal injury, privacy leakage, failure to fulfill any duties of honesty, reasonability or prudence, or any other negligent pecuniary loss).
                </p>
                <p>
                    The opinions, suggestions or other comments expressed by Users on the Platform are all belong to Users themselves, and do not represent the views of the Coinsprize operator.
                </p>
                <p>
                    The Platform will make every effort to help Users retrieve but not be liable for their losses caused by the blockchain problems.
                </p>
                <p>
                    Since User’s account funds are all on the corresponding blockchain account, the Platform warrants that it can only be operated by User himself/herself. And the Platform is not liable for User’s pecuniary loss if the User intentionally or unintentionally leaks his/her account information to others.
                </p>
                <p>
                    Coinsprize operator is not liable of any hardware or software, defects, unstable or lost Internet connections, or any other technical errors that may limit User’s access to the website or prevent User from an uninterrupted play.
                </p>
                <p>
                    If we mistakenly credit your Account with winnings that do not belong to you, whether due to a technical, error in the pay-tables, or human error or otherwise, the amount will remain our property and will be deducted from your Account. If you have withdrawn funds that do not belong to you prior to us becoming aware of the error, the mistakenly paid amount will (without prejudice to other remedies and actions that may be available at law) constitute a debt owed by you to us. In the event of an incorrect crediting, you are obliged to notify us immediately by email.
                </p>
                <h2>
                    7. Alterations
                </h2>
                <p>
                    The Coinsprize operator reserves the right to amend the Agreement, apply conventions and terms of use if necessary. Once the alteration happens, it will be shown on relevant major page of the application. All the alterations will immediately take effect upon the next time visit or login, and the Platform will inform Users through email. By continuing to use the products and services, Users must read and accept the new version of the Agreement. Otherwise, Users must not use or access our products and services, and inform Us immediately in written form. In order to avoid misunderstandings and disputes at a large stage, Users can print out the Agreement. If Users continue to obtain services provided by the Platform after receiving the notification about Agreement alterations, The Platform will regard it as acceptance by Users.
                </p>
                <p>
                    Coinsprize operator will inform Users with all notifications via announcements on major pages on the Platform, emails or letters.
                </p>
                <h2>
                    8. Intellectual Property
                </h2>
                <p>
                    The Coinsprize Platform and all works and materials on the Platform published by the Coinsprize operator, whose copyrights, patents, trademarks, trade secret rights and other intellectual property rights are owned by the legal owner of the Coinsprize operator or persons who authorized the rights to Coinsprize operator. Unless authorized previously by the Coinsprize operator or legal owners, anyone shall not use the software in any form, otherwise the Coinsprize operator will immediately terminate the providing of products and services to Users, and pursue the legal liability of Users in accordance with the law to compensate all the losses of Coinsprize operator.
                </p>
                <p>
                    No person shall copy, decompile, disassemble or reverse engineer any functions or programs without the authorization of the Coinsprize operator.
                </p>
                <h2>
                    9. Authorization
                </h2>
                <p>
                    When User’s original works are provided to the Coinsprize official website by uploading, transmission, input or other methods, it is regarded that the User transfers all copyright to Coinsprize operator except for the reserved authorship. The Coinsprize operator reserves the right to use, modify, edit, copy, publicly broadcast or publish the works, or assign/distribute the aforementioned rights. User authorizes the Coinsprize operator to exercise all necessary rights above, including but not limited to copyright, portrait rights and so forth.
                </p>
                <h2>
                    10. Risk Notifications
                </h2>
                <p>
                    The User understands and accepts the risks in connection with transferring digital currencies to the Platform and participating games. In particular, the User understands the inherent risks listed hereinafter:
                </p>
                <div>
                    <p>
                        a)	Risk of software weaknesses: The User understands and accepts that the Blockchain System concept, the underlying software application and software platform is still in an early development stage and unproven, why there is no warranty that the process for creating tickets will be uninterrupted or error-free and why there is an inherent risk that the software could contain weaknesses, vulnerabilities or bugs causing, inter alia, the complete loss of digital currencies.
                    </p>
                    <p>
                        b)	Regulatory risk: The User understands and accepts that the blockchain technology allows new forms of interaction and that it is possible that certain jurisdictions will apply existing regulations on, or introduce new regulations addressing blockchain technology based applications, which may be contrary to the current setup of the System and which may, inter alia, result in substantial modifications of the Service, including its termination and the loss of digital currencies.
                    </p>
                    <p>
                        c)	Risk of loss of private key: Digital currencies in account wallet can only be accessed with a wallet seed or combination of private key and password. The private key is encrypted with a password. The User understands and accepts that if his wallet file or password respectively his private key got lost or stolen, the obtained digital currencies associated with the User’s Wallet or password will be unrecoverable and will be permanently lost with the wallet seed.
                    </p>
                    <p>
                        d)	Risk of theft: The User understands and accepts that the Service concept, the underlying software application and software platform may be exposed to attacks by hackers or other individuals that that could result in theft or loss of digital currencies, impacting the ability to develop the Services.
                    </p>
                </div>
                <h2>
                    11. Complaints
                </h2>
                <p>Any disputes from Users can be addressed through complaint.</p>
                <p>You may contact our support@Coinsprize.com customer service according to the instructions located at the Website to give us any complaints regarding our services.</p>
                <p>Complaints are handled in the support department and escalated in the organization of the Coinsprize in the case that support personnel do not solve the case immediately. The User shall be informed about the state of the complaint to a reasonable level.</p>
                <p>If the dispute is not resolved by support personnel, you can contact any independent body, gaming authority or licensor listed on the Coinsprize website.</p>
                <p>In the event of any dispute, you agree that the records of the server and blockchain shall act as the final authority in determining the outcome of any claim.</p>
                <p>You agree that in the unlikely event of a disagreement between the result that appears on your screen and the game server, the result that appears on the game server and in blockchain will prevail, and you acknowledge and agree that our records will be the final authority in determining the terms and circumstances of your participation in the relevant online gaming activity and the results of this participation. </p>
                <p>When we wish to contact you regarding such a dispute, we will do so by using any of Your contact details in your User account. </p>
                <p>If ways above cannot effectively resolve the dispute, the user can address the issue through the corresponding legal channels.</p>
                <p>This Terms and Conditions shall apply to the local laws of the User. If any part of the Agreement is found to be in violation of or void by a court of competent jurisdiction, it shall not affect the validity of other contents.</p>
                <p>If the terms of the Agreement conflict with local laws, the terms will be utterly re-interpreted in accordance with the local laws, and other terms remain valid. The Platform is not liable if Users use the Platform without clear knowing of the Platform not being permitted by local laws.</p>
                <p>Both Users and the Coinsprize operator unanimously agree to be governed by the judicial authority of the geographic region where Coinsprize operator is located if any dispute occurs.</p>
            </div>
        </div>
        <Footer class="lucky11"></Footer>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue'
    import BreadCrumbs from '~/components/BreadCrumbs.vue'
    import Footer from '~/components/Footer.vue'

    export default {
        data () {
            return {
                title: ''
            }
        },
        methods: {
            initPop () {
                /* head 弹窗 */
                this.$store.commit('initHeadState', new Date().getTime())
            }
        },
        components: {
            Footer,
            Header,
            BreadCrumbs
        }
    }
</script>
<style scoped lang="less">
    .head-box{
        background: linear-gradient(to right, #4b6584, #655aae, #545f94);
    }
    .main {
        position: relative;
        width: 1190px;
        margin: 0 auto;
        overflow: hidden;
    }

    .main-policy {
        position: relative;
        min-height: 200px;
        padding: 20px 50px;
        background: #fff;
        border-radius: 6px;
        h1, h2, h3, h4 {
            font-weight: bold;
        }
        h1 {
            line-height: 50px;
            font-size: 26px;
            margin-bottom: 30px;
            text-align: center;
        }
        h2 {
            margin: 30px 0 20px;
            font-size: 20px;
        }
        h3 {
            margin: 15px 0 15px;
            font-size: 18px;
        }
        h4 {
            margin: 10px 0 10px;
            font-size: 16px;
        }
        span {

        }
        p {
            font-size: 14px;
        }
        p + p {
            margin-top: 14px;
        }
        div {
            p {
                text-indent: 0;
                padding-left: 2em;
            }
            p + p {
                margin-top: 0px;
            }
        }
    }
</style>
