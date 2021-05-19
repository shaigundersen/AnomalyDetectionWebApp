#include <napi.h>
#include <iostream>
#include "LearnDetectAsyncWorker.h"
using namespace Napi;



//input: detectorType, json learn, json detect, callback func
void LearnAndDetect(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  std::string detectorType = info[0].As<Napi::String>().Utf8Value();
  Napi::Object json_learn_napi = info[1].As<Napi::Object>();
  Napi::Object json_detect_napi = info[2].As<Napi::Object>();
  Napi::Function callback = info[3].As<Napi::Function>();

  Napi::Object jsonGlobal = env.Global().Get("JSON").As<Napi::Object>();
  Napi::Function stringify = jsonGlobal.Get("stringify").As<Napi::Function>();
  std::string learnString = stringify.Call(jsonGlobal, {json_learn_napi}).As<Napi::String>().Utf8Value();
  std::string detectString = stringify.Call(jsonGlobal, {json_detect_napi}).As<Napi::String>().Utf8Value();

  LearnDetectAsyncWorker *worker = new LearnDetectAsyncWorker(callback, detectorType, learnString, detectString);
  worker->Queue();
}



Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{

  exports.Set(Napi::String::New(env, "LearnAndDetect"), Napi::Function::New(env, LearnAndDetect));

  return exports;
}

NODE_API_MODULE(addon, InitAll)