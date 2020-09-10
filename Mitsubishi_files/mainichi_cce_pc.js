function cx_cce_start(){
  /* Subscription */
  var cx_targetElementId = "cxSubscMsg";
  var cx_ref = cX.library._getSessionAnnotations()['referrer_host_S']|| "none";
  var cx_cce_cpObj = {};
  if(cX.library.m_customParameters && cX.library.m_customParameters.length>0){
    for(var i=0;i<cX.library.m_customParameters.length;i++){
      var cx_cp = cX.library.m_customParameters[i].split("=");
      cx_cce_cpObj[cx_cp[0]] = cx_cp[1];
    }
  }
  var cx_atype = cx_cce_cpObj['cp_art_type']|| "none";
  var cx_para_fm = cx_cce_cpObj['cp_para_fm']|| "none";
  var cx_app = cx_cce_cpObj['cp_app']|| "none";
  var cx_pid = cX.getCookie("cX_PID") || "none";
  var cx_cce_cm1 = cX.getCookie("cX_cce_cm1") || "none";
  var cx_cce_cm2 = cX.getCookie("cX_cce_cm2") || "none";
  var cx_cce_hostname = location.hostname || "none";
  var cx_context = {
        categories:{'pid':cx_pid, 'referrer-s':cx_ref, 'c-hostname':cx_cce_hostname, 'cm1':cx_cce_cm1, 'cm2':cx_cce_cm2, 'art-type':cx_atype, 'para-fm':cx_para_fm, 'app': cx_app }
      }
  var cx_dbgref = cX.parseUrlArgs()['dbgref'] || null;
  if (cx_dbgref){
     cx_context['referrer'] = cx_dbgref;
  }
  var usi = cX.getUserId();
  var userObj = {"ids": {"usi":usi}};
  var es_accountid = cX.getCookie('es_accountid');
  if(es_accountid){
    userObj = {"ids": {"usi":usi,"mai":es_accountid}};
  }
  /* GDPR */
  var cx_debug = cX.parseUrlArgs()['debug'] || "none";
  function cxGdprInit(data,context){
    cxGdprMsg.updateMessage(data,context);
  }
  if(document.getElementById('cxGdprMsg')){
    cX.CCE.run(
      {
        widgetId : "2e5f54ff53716fb330d3e72f1f73ac73191075bd",
        targetElementId : "cxGdprMsg"
      },
      {
         "context": { categories: { 'debug' : cx_debug, 'c-hostname':cx_cce_hostname} },
         user: userObj
      },
      cxGdprInit
    );
  }

  // For page bottom bnr 20181122
  if(document.getElementById('cxPageBottomBnr')){
    cX.CCE.run(
    {
    widgetId: "978daef59e5260497c93376834b8e4dc71c9a9d9",
    targetElementId: "cxPageBottomBnr"
    },
    {
      context: cx_context,
      user: userObj
    }
    );
  }
}
var cX = cX || {}; cX.callQueue = cX.callQueue || [];
cX.CCE = cX.CCE || {};cX.CCE.callQueue = cX.CCE.callQueue || [];
if (document.readyState === "loading") {
  window.document.addEventListener("DOMContentLoaded", function (event) {
    cX.callQueue.push(['invoke', cx_cce_start]);
  });
} else {
  cX.callQueue.push(['invoke', cx_cce_start]);
}