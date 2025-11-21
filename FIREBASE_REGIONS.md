# Firebase Cloud Functions - Regional Deployment

## Current Configuration

✅ **Deployed to**: `australia-southeast1` (Sydney, Australia)

This provides optimal latency for Australian users.

## Available Firebase Regions

### Asia Pacific

| Region ID | Location | Typical Latency from Gold Coast |
|-----------|----------|--------------------------------|
| `australia-southeast1` | Sydney, Australia | ~15-30ms ✅ **CURRENT** |
| `australia-southeast2` | Melbourne, Australia | ~20-35ms |
| `asia-southeast1` | Singapore | ~100-150ms |
| `asia-southeast2` | Jakarta, Indonesia | ~150-200ms |
| `asia-northeast1` | Tokyo, Japan | ~120-180ms |
| `asia-northeast2` | Osaka, Japan | ~130-190ms |
| `asia-south1` | Mumbai, India | ~200-250ms |

### Americas

| Region ID | Location | Typical Latency from Gold Coast |
|-----------|----------|--------------------------------|
| `us-central1` | Iowa, USA | ~180-220ms |
| `us-east1` | South Carolina, USA | ~220-260ms |
| `us-east4` | Northern Virginia, USA | ~220-260ms |
| `us-west1` | Oregon, USA | ~150-200ms |
| `northamerica-northeast1` | Montreal, Canada | ~230-280ms |
| `southamerica-east1` | São Paulo, Brazil | ~300-350ms |

### Europe

| Region ID | Location | Typical Latency from Gold Coast |
|-----------|----------|--------------------------------|
| `europe-west1` | Belgium | ~280-320ms |
| `europe-west2` | London, UK | ~300-340ms |
| `europe-west3` | Frankfurt, Germany | ~290-330ms |
| `europe-west6` | Zurich, Switzerland | ~300-340ms |
| `europe-central2` | Warsaw, Poland | ~310-350ms |

## How to Change Region

Edit `functions/index.js`:

```javascript
exports.api = functions
  .region('australia-southeast1') // Change this line
  .https.onRequest(async (req, res) => {
    // ... rest of code
  });
```

### Examples:

**Sydney (Current)**:
```javascript
.region('australia-southeast1')
```

**Melbourne**:
```javascript
.region('australia-southeast2')
```

**Singapore** (if you have Asian traffic):
```javascript
.region('asia-southeast1')
```

**Multiple Regions** (for global traffic):
```javascript
.region('australia-southeast1', 'us-west1', 'europe-west1')
```

## Deployment

After changing the region:

```bash
# Redeploy the function
firebase deploy --only functions --project nilushandevelopment
```

The function URL will include the region:
- Sydney: `https://australia-southeast1-nilushandevelopment.cloudfunctions.net/api`
- But Firebase Hosting automatically routes to it via `/api/**`

## Cost Implications

**All regions have the same pricing:**
- $0.40 per million invocations
- Free tier: 2 million invocations/month

**Network egress** (data transfer out):
- Australia: $0.15/GB (after 5GB free)
- Asia: $0.12/GB
- Americas: $0.12/GB
- Europe: $0.12/GB

## Performance Optimization

### For Australian Users (Current Setup) ✅
- **Region**: `australia-southeast1`
- **Latency**: 15-30ms
- **Best for**: Australian visitors (your primary audience)

### For Global Users
Use multiple regions:

```javascript
exports.api = functions
  .region(
    'australia-southeast1',  // Australia
    'asia-southeast1',       // Asia
    'us-west1',              // Americas
    'europe-west1'           // Europe
  )
  .https.onRequest(async (req, res) => {
    // ... code
  });
```

Firebase automatically routes requests to the nearest region.

**Cost**: Same per-invocation cost, but 4x function instances.

## Regional Function URLs

After deployment, you'll see:

```
Function URL (australia-southeast1):
https://australia-southeast1-nilushandevelopment.cloudfunctions.net/api

But users access via:
https://your-site.web.app/api/chat
```

Firebase Hosting handles the routing automatically.

## Recommendations

### Current Setup (Recommended) ✅

**Single Region**: `australia-southeast1`

**Pros**:
- Optimal latency for Australian users (15-30ms)
- Simple configuration
- Lower cost (one function instance)
- Gold Coast is ~800km from Sydney

**Cons**:
- Higher latency for international visitors (~200-300ms)

### If You Get International Traffic

Add Singapore and US West:

```javascript
.region('australia-southeast1', 'asia-southeast1', 'us-west1')
```

**Pros**:
- Better latency globally
- Automatic routing to nearest region

**Cons**:
- 3x function instances (still cheap)
- Slightly more complex

## Testing Regional Performance

Test latency from your location:

```bash
# Test from Gold Coast
curl -w "\nTime: %{time_total}s\n" https://your-site.web.app/api/chat
```

## Monitoring

View per-region metrics in Firebase Console:
https://console.firebase.google.com/project/nilushandevelopment/functions/usage

## Changing Regions After Deployment

1. Update `functions/index.js`
2. Deploy: `firebase deploy --only functions`
3. Old region function is automatically removed
4. New region function is deployed

**No downtime** - Firebase handles the transition.

---

**Current Configuration**: ✅ Sydney (`australia-southeast1`)
**Best for**: Australian users (Gold Coast, QLD)
**Latency**: 15-30ms
**Last Updated**: 2025-11-21
