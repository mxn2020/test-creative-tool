# Audit Log Scripts

This directory contains scripts for managing audit logs in the MongoDB database.

## Scripts

### Check Audit Logs
```bash
npm run audit:check
```
Checks the current state of audit logs in the database:
- Verifies if the AuditLog collection exists
- Shows total count of audit logs
- Shows count for a specific user (admin user by default)
- Displays action type distribution
- Shows recent audit log entries

### Seed Audit Logs
```bash
npm run audit:seed
```
Generates test audit log data for the admin user (ID: 688dc486a823dd5e2720760b):
- Creates 150 sample audit log entries
- Spreads entries over the past 30 days
- Includes various action types (login, logout, profile updates, etc.)
- Generates realistic IP addresses and user agents
- Includes both successful and failed actions (95% success rate)

### Test Audit API
```bash
npm run audit:test-api
```
Tests the audit logs API endpoint:
- Fetches audit logs for the admin user
- Tests filtering by action type
- Tests pagination functionality

Note: This script requires the API server to be running (typically on port 8889).

## Usage

1. First, check if audit logs exist:
   ```bash
   npm run audit:check
   ```

2. If no audit logs exist for the admin user, seed some test data:
   ```bash
   npm run audit:seed
   ```

3. Verify the data was added:
   ```bash
   npm run audit:check
   ```

4. Test the API endpoint (make sure the server is running):
   ```bash
   npm run dev:netlify  # In another terminal
   npm run audit:test-api
   ```

## Audit Log Schema

The AuditLog model includes:
- `userId`: Better Auth user ID
- `action`: Type of action performed
- `details`: JSON object with additional action details
- `ip`: IP address of the request
- `userAgent`: Browser/client information
- `success`: Whether the action succeeded
- `error`: Error message if the action failed
- `createdAt`: Timestamp of the action

## Action Types

The seeder generates the following action types:
- Authentication: login, logout, password_change
- Profile: profile_update, role_change, settings_update
- User Management: user_created, user_updated, user_deleted
- Content: post_created, post_updated, post_deleted, comment_created, comment_deleted
- System: api_access, data_export, permission_granted, permission_revoked