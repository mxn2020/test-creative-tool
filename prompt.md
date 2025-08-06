we have two folders:\│
│ - geenius\ │
│ - geeniues-template-vite...\ │
│ \│
│ geenius is the system that has a cli (and will soon have a simple vite frontend) as tool for deploying templates like the given template from the second folder but via│
│ github.\ │
│ \│
│ it tracks it status.\│
│ it also has an agentic ai setup.\│
│ the templates contain a dev-container package. the user can submit change requests from the template directly to this geenius system.\ │
│ \│
│ geenius will then clone the repo of the template, deploy an agentic ai in a stackblitz webcontainer where the templates repo was cloned into, then applied the change│
│ requetss as a fully autonomous ai agent, then creates tests for each change, runs tests and improves code until everything is fine, then commits and pushes the changes│
│ (all of this on a feature/xyz branch taken from the develop branch). this will then initiate an automatic deploy of the feature branch in netlifdy where the user can│
│ test and accept the changes. then the ai agent merges the changes into devlop. user can again test and accept. then it merges it into main.\ │
│ \│
│ this is the process.\│ currently i can cerate change requests and submit them.
geenius receives them but is struggling with the webcontainer setup.

can you analyze below errors and inform me about the issues?\ │
do not make any code changes yet.
│ \│
│ currently i get these errors when submitting changes:\ │
│ \ 
## geenius server logs:
⬥ Rewrote URL to /.netlify/functions/process-changes
Request from ::1: OPTIONS /.netlify/functions/process-changes
Response with status 200 in 3 ms.
⬥ Rewrote URL to /.netlify/functions/process-changes
Request from ::1: POST /.netlify/functions/process-changes
[session_1752863674012_ker7q2nhh] INFO: AI agent processing started {
  changesCount: 1,
  submissionId: '1752863673994_i5ochpmcx',
  aiProvider: 'anthropic'
}
Response with status 200 in 1114 ms.
[session_1752863674012_ker7q2nhh] INFO: Starting AI agent processing workflow {
  projectId: 'localhost',
  repositoryUrl: 'https://github.com/mehdinabhani/geenius-template-vite-react-mongo',
  changesCount: 1
}
[session_1752863674012_ker7q2nhh] INFO: Creating StackBlitz sandbox environment... 
⬥ Rewrote URL to /.netlify/functions/process-changes/1752863673994_i5ochpmcx
Request from ::1: GET /.netlify/functions/process-changes/1752863673994_i5ochpmcx
[session_1752863674012_ker7q2nhh] ERROR: Processing failed { error: 'window is not defined' }
Response with status 404 in 339 ms.

│ \│

│ \│

│ \│
│ ## template browser side:\ │
Submitting changes: {submissionId: '1752863673994_i5ochpmcx', timestamp: 1752863673994, changes: Array(1), globalContext: {…}, summary: {…}}changes: Array(1)0: category: "enhancement"componentContext: boundingRect: DOMRect {x: 345, y: 512, width: 294, height: 114, top: 512, …}childComponents: []currentProps: undefineddescription: "Statistical card showing Bundle Size: < 50KB"domPath: "div#root > div.min-h-screen.relative > div.relative.cursor-pointer > div.App > div.relative.cursor-pointer > div.min-h-screen.bg-gradient-to-br.from-slate-900.via-purple-900.to-slate-900 > div.relative.cursor-pointer > section.container.mx-auto.px-4.py-12 > div.grid.grid-cols-2.md:grid-cols-4.gap-6 > div.relative.cursor-pointer"filePath: "src/lib/dev-container/shadcn/Card.tsx"name: "Bundle Size Stat Card"parentComponents: []semanticTags: (4) ['card', 'container', 'content', 'ui'][[Prototype]]: ObjectcomponentId: "stat-card-1"feedback: "test"id: "uhk4bly66md95rti3"pageContext: pathname: "/"searchParams: {}timestamp: 1752863672091title: "Geenius Template - Vite + React + MongoDB"url: "http://localhost:8889/"[[Prototype]]: Objectpriority: "medium"status: "pending"timestamp: 1752863672091[[Prototype]]: Objectlength: 1[[Prototype]]: Array(0)globalContext: environment: "development"projectId: "localhost"repositoryUrl: "https://github.com/mehdinabhani/geenius-template-vite-react-mongo"userInfo: sessionId: "1752863673994_mgvyj1isv"userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"viewport: height: 1088width: 1310[[Prototype]]: Object[[Prototype]]: Objectversion: "1.0.0"[[Prototype]]: ObjectsubmissionId: "1752863673994_i5ochpmcx"summary: affectedComponents: Array(1)0: "stat-card-1"length: 1[[Prototype]]: Array(0)categoryCounts: enhancement: 1[[Prototype]]: ObjectestimatedComplexity: "low"priorityCounts: medium: 1[[Prototype]]: ObjecttotalChanges: 1[[Prototype]]: Objecttimestamp: 1752863673994[[Prototype]]: Object
ChangeSubmissionDialog.tsx:240GET http://localhost:8888/api/process-changes/1752863673994_i5ochpmcx 404 (Not Found)
(anonymous) @ ChangeSubmissionDialog.tsx:240
setInterval
startPolling @ ChangeSubmissionDialog.tsx:237
handleSubmit @ ChangeSubmissionDialog.tsx:213
await in handleSubmit
executeDispatch @ react-dom-client.development.js:16368
runWithFiberInDEV @ react-dom-client.development.js:1519
processDispatchQueue @ react-dom-client.development.js:16418
(anonymous) @ react-dom-client.development.js:17016
batchedUpdates$1 @ react-dom-client.development.js:3262
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16572
dispatchEvent @ react-dom-client.development.js:20658
dispatchDiscreteEvent @ react-dom-client.development.js:20626
<button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
_c @ button.tsx:48
react-stack-bottom-frame @ react-dom-client.development.js:23863
renderWithHooksAgain @ react-dom-client.development.js:5629
renderWithHooks @ react-dom-client.development.js:5541
updateForwardRef @ react-dom-client.development.js:8645
beginWork @ react-dom-client.development.js:10861
runWithFiberInDEV @ react-dom-client.development.js:1519
performUnitOfWork @ react-dom-client.development.js:15132
workLoopSync @ react-dom-client.development.js:14956
renderRootSync @ react-dom-client.development.js:14936
performWorkOnRoot @ react-dom-client.development.js:14419
performSyncWorkOnRoot @ react-dom-client.development.js:16231
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16079
processRootScheduleInMicrotask @ react-dom-client.development.js:16116
(anonymous) @ react-dom-client.development.js:16250
<Button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
ChangeSubmissionDialog @ ChangeSubmissionDialog.tsx:468
react-stack-bottom-frame @ react-dom-client.development.js:23863
renderWithHooksAgain @ react-dom-client.development.js:5629
renderWithHooks @ react-dom-client.development.js:5541
updateFunctionComponent @ react-dom-client.development.js:8897
beginWork @ react-dom-client.development.js:10522
runWithFiberInDEV @ react-dom-client.development.js:1519
performUnitOfWork @ react-dom-client.development.js:15132
workLoopSync @ react-dom-client.development.js:14956
renderRootSync @ react-dom-client.development.js:14936
performWorkOnRoot @ react-dom-client.development.js:14419
performSyncWorkOnRoot @ react-dom-client.development.js:16231
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16079
processRootScheduleInMicrotask @ react-dom-client.development.js:16116
(anonymous) @ react-dom-client.development.js:16250Understand this error
ChangeSubmissionDialog.tsx:264 Polling error: Error: HTTP 404: Not Found
at ChangeSubmissionDialog.tsx:243:17
overrideMethod @ hook.js:608
(anonymous) @ ChangeSubmissionDialog.tsx:264
setInterval
startPolling @ ChangeSubmissionDialog.tsx:237
handleSubmit @ ChangeSubmissionDialog.tsx:213
await in handleSubmit
executeDispatch @ react-dom-client.development.js:16368
runWithFiberInDEV @ react-dom-client.development.js:1519
processDispatchQueue @ react-dom-client.development.js:16418
(anonymous) @ react-dom-client.development.js:17016
batchedUpdates$1 @ react-dom-client.development.js:3262
dispatchEventForPluginEventSystem @ react-dom-client.development.js:16572
dispatchEvent @ react-dom-client.development.js:20658
dispatchDiscreteEvent @ react-dom-client.development.js:20626
<button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
_c @ button.tsx:48
react-stack-bottom-frame @ react-dom-client.development.js:23863
renderWithHooksAgain @ react-dom-client.development.js:5629
renderWithHooks @ react-dom-client.development.js:5541
updateForwardRef @ react-dom-client.development.js:8645
beginWork @ react-dom-client.development.js:10861
runWithFiberInDEV @ react-dom-client.development.js:1519
performUnitOfWork @ react-dom-client.development.js:15132
workLoopSync @ react-dom-client.development.js:14956
renderRootSync @ react-dom-client.development.js:14936
performWorkOnRoot @ react-dom-client.development.js:14419
performSyncWorkOnRoot @ react-dom-client.development.js:16231
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16079
processRootScheduleInMicrotask @ react-dom-client.development.js:16116
(anonymous) @ react-dom-client.development.js:16250
<Button>
exports.jsxDEV @ react-jsx-dev-runtime.development.js:346
ChangeSubmissionDialog @ ChangeSubmissionDialog.tsx:468
react-stack-bottom-frame @ react-dom-client.development.js:23863
renderWithHooksAgain @ react-dom-client.development.js:5629
renderWithHooks @ react-dom-client.development.js:5541
updateFunctionComponent @ react-dom-client.development.js:8897
beginWork @ react-dom-client.development.js:10522
runWithFiberInDEV @ react-dom-client.development.js:1519
performUnitOfWork @ react-dom-client.development.js:15132
workLoopSync @ react-dom-client.development.js:14956
renderRootSync @ react-dom-client.development.js:14936
performWorkOnRoot @ react-dom-client.development.js:14419
performSyncWorkOnRoot @ react-dom-client.development.js:16231
flushSyncWorkAcrossRoots_impl @ react-dom-client.development.js:16079
processRootScheduleInMicrotask @ react-dom-client.development.js:16116
(anonymous) @ react-dom-client.development.js:16250Understand this error
3localhost/:1 Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received
│ \│
│ \│
│ ## 